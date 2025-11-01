require('dotenv').config();

const express = require('express');
const mysql2 = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { Server } = require('socket.io');
const http = require('http')

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Storage per immagini profilo
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Connessione al database
const db = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'orion'
});

/* --------------------------------------- */

// Register
app.post('/register', async (req, res) => {
  try 
  {
    const { username, email, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const percorso = "default.webp";

    const ql = `
      INSERT INTO utenti (username, email, password, foto_profilo)
      VALUES (?, ?, ?, ?)
    `;
    await db.query(ql, [username, email, password_hash, percorso]);
    res.status(200).json({ mex: "Registrato con successo." });
  } 
  catch (err) 
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

// Login
app.post('/login', async (req, res) => {
  try 
  {
    const { email, password } = req.body;
    const ql = "SELECT * FROM utenti WHERE email = ?";
    const [ris] = await db.query(ql, [email]);

    if (ris.length === 0) return res.status(401).json({ mex: "Credenziali non valide." });

    const password_hash = ris[0].password;
    const check = await bcrypt.compare(password, password_hash);

    if (!check) return res.status(401).json({ mex: "Credenziali non valide." });

    const payload = { id: ris[0].ID, username: ris[0].username, email: ris[0].email, foto: ris[0].foto_profilo };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.status(200).json({ status: "success", mex: "Accesso eseguito con successo.", token });

  } 
  catch (err) 
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

// creazione chat
app.post('/create-chat', async (req, res) => {
  const { id_utente1, id_utente2 } = req.body;
  const percorso = "chat_default.webp";
  
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [existingChat] = await conn.query(
      `
      SELECT c.ID
      FROM chats c
      JOIN membri_chat mc1 ON c.ID = mc1.ID_chat AND mc1.ID_utente = ?
      JOIN membri_chat mc2 ON c.ID = mc2.ID_chat AND mc2.ID_utente = ?
      WHERE (SELECT COUNT(*) FROM membri_chat WHERE ID_chat = c.ID) = 2
      `,
      [id_utente1, id_utente2]
    );

    if (existingChat.length > 0) 
    {
      await conn.rollback();
      conn.release();
      return res.status(200).json({ mex: 'Chat già esistente' });
    }

    const [usernames] = await conn.query(
      `SELECT ID, username FROM utenti WHERE ID IN (?, ?)`,
      [id_utente1, id_utente2, id_utente1, id_utente2]
    );

    const nomeChat = `Chat tra ${usernames[0].username} e ${usernames[1].username}`;

    const [chatResult] = await conn.query(
      `INSERT INTO chats (nome, logo_chat, data_creazione) VALUES (?, ?, NOW())`,
      [nomeChat, percorso]
    );

    const chatId = chatResult.insertId;

    await conn.query(
      `INSERT INTO membri_chat (ID_chat, ID_utente) VALUES (?, ?), (?, ?)`,
      [chatId, id_utente1, chatId, id_utente2]
    );

    await conn.commit();
    res.status(201).json({ mex: 'Nuova chat creata con successo', chatId, nomeChat });

  } 
  catch (error) 
  {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ error: 'Errore nella creazione della chat' });
  } 
  finally 
  {
    conn.release();
  }
});

// Ricerca utenti
app.post('/search-user', async (req, res) => {
  try 
  {
    const { username, my_username } = req.body;
    const ql = `
      SELECT ID, username, foto_profilo
      FROM utenti
      WHERE username <> ?
      AND username LIKE CONCAT('%', ?, '%')
    `;
    const [ris] = await db.query(ql, [my_username, username]);
    res.status(200).json(ris);
  } 
  catch (err) 
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

// get chat
app.get('/chat/:id', async (req, res) => {
  try
  {
    const { id } = req.params;
    const ql = `
      SELECT c.ID AS chat_id, c.nome, c.logo_chat,
        mc1.ID_utente AS id_utente1,
        mc2.ID_utente AS id_utente2
      FROM chats AS c
      JOIN membri_chat AS mc1 ON c.ID = mc1.ID_chat
      JOIN membri_chat AS mc2 ON c.ID = mc2.ID_chat
      WHERE mc1.ID_utente = ?
      AND mc2.ID_utente <> mc1.ID_utente
    `;
    const [ris] = await db.query(ql, [id]);
    res.status(200).json(ris);
  }
  catch(err) 
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

// upload media
app.post('/upload-media', upload.single('media'), async (req, res) => {
  try
  {
    const percorso = req.file.filename;    
    res.status(200).json({ media: percorso });
  }
  catch(err)
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

// invia messaggio
io.on('connection', (socket) => {
  console.log('utente connesso:', socket.id);
  socket.on('join_chat', (id_chat) => {
    socket.join(`chat_${id_chat}`);
  });

  socket.on('send_message', async (data) => {
    const { id_chat, id_utente, username, contenuto, media } = data;

    try 
    {
      await db.query(
        `INSERT INTO messaggi (ID_chat, ID_utente, contenuto, media, data_creazione)
         VALUES (?, ?, ?, ?, NOW())`,
        [id_chat, id_utente, contenuto, media]
      );

      const data_creazione = new Date();
      const payload = { id_chat, id_utente, username, contenuto, media, data_creazione };

      io.to(`chat_${id_chat}`).emit('receive_message', payload);
    } 
    catch (err) 
    {
      console.error('Errore durante il salvataggio del messaggio:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Utente disconnesso:', socket.id);
  });
});

// get messaggi
app.get('/messages/:id_chat', async (req, res) => {
  try 
  {
    const { id_chat } = req.params;
    const ql = `
      SELECT m.ID, m.contenuto, m.media, m.ID_utente AS id_utente, m.data_creazione, u.username
      FROM messaggi AS m JOIN utenti AS u ON m.ID_utente = u.ID
      WHERE m.ID_chat = ?
      ORDER BY m.data_creazione ASC;
    `;
    const [ris] = await db.query(ql, [id_chat]);
    res.status(200).json(ris);
  } 
  catch (err) 
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

// search chat
app.post('/search-chat', async (req, res) => {
  try
  {
    const { nomeChat } = req.body;
    const ql = `
      SELECT c.ID AS chat_id, c.nome, c.logo_chat,
          mc1.ID_utente AS id_utente1,
          mc2.ID_utente AS id_utente2
      FROM chats AS c
      JOIN membri_chat AS mc1 ON c.ID = mc1.ID_chat
      JOIN membri_chat AS mc2 ON c.ID = mc2.ID_chat
      WHERE c.nome LIKE CONCAT('%', ?, '%')
      AND mc2.ID_utente <> mc1.ID_utente LIMIT 1;
    `;
    const [ris] = await db.query(ql, [nomeChat]);
    res.status(200).json(ris);
  }
  catch(err)
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
})

/* ------------- chat settings ------------- */

// modifica nome chat
app.patch('/change-chat-name', async (req, res) => {
  try
  {
    const { nuovoNome, id } = req.body;
    const ql = "UPDATE chats SET nome = ? WHERE ID = ?";
    await db.query(ql, [nuovoNome, id]);
    res.status(200).json({ mex: "Nome della chat aggiornato.", nuovoNome });
  }
  catch(err)
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

// modifica foto chat
app.patch('/change-chat-logo', upload.single('logoChat'), async (req, res) => {
  try
  {
    const { id } = req.body;
    const ql = "UPDATE chats SET logo_chat = ? WHERE ID = ?";
    const percorso = req.file.filename;
    await db.query(ql, [percorso, id]);
    res.status(200).json({ mex: "Logo della chat aggiornato.", percorso });
  }
  catch(err)
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

// elimina chat
app.delete('/delete-chat', async (req, res) => {
  try
  {
    const { id } = req.body;
    const ql = "DELETE chats FROM chats WHERE ID = ?";
    await db.query(ql, [id]);
    res.status(200).json({ mex: "Chat eliminata." });
  }
  catch(err)
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

/* ------------- profile settings ------------- */

// modifica foto profilo
app.patch('/change-foto-profilo', upload.single('fotoProfilo'), async (req, res) => {
  try
  {
    const { id } = req.body;
    const ql = "UPDATE utenti SET foto_profilo = ? WHERE ID = ?";
    const percorso = req.file.filename;
    await db.query(ql, [percorso, id]);
    res.status(200).json({ mex: "Foto profilo aggiornata.", percorso });
  }
  catch(err)
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

// modifica username
app.patch('/change-username', async (req, res) => {
  try
  {
    const { nuovoUsername, id } = req.body;
    const ql = "UPDATE utenti SET username = ? WHERE ID = ?";
    await db.query(ql, [nuovoUsername, id]);
    res.status(200).json({ mex: "Username aggiornato.", nuovoUsername });
  }
  catch(err)
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

// modifica email
app.patch('/change-email', async (req, res) => {
  try
  {
    const { nuovaEmail, id } = req.body;
    const ql = "UPDATE utenti SET email = ? WHERE ID = ?";
    await db.query(ql, [nuovaEmail, id]);
    res.status(200).json({ mex: "Email aggiornata.", nuovaEmail });
  }
  catch(err)
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

// modifica password
app.patch('/change-password', async (req, res) => {
  try
  {
    const { nuovaPassword, id } = req.body;
    const ql = "UPDATE utenti SET password = ? WHERE ID = ?";
    const password_hash = await bcrypt.hash(nuovaPassword, 10);

    await db.query(ql, [password_hash, id]);
    res.status(200).json({ mex: "Password aggiornata." });
  }
  catch(err)
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

// elimina account
app.delete('/delete-profile', async (req, res) => {
  try
  {
    const { id } = req.body;
    const ql = "DELETE utenti FROM utenti WHERE ID = ?";
    await db.query(ql, [id]);
    res.status(200).json({ mex: "Profilo eliminato." });
  }
  catch(err)
  {
    res.status(500).json({ mex: "Errore: " + err });
  }
});

server.listen(3030, '0.0.0.0', () => {
  console.log("Server online su porta 3030");
});