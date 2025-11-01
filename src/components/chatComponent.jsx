import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

// components
import Message from './message';

// hook
import { useUserData } from '../hook/userData';
import { useSelectedChat } from '../hook/selectedChat';

// utils
import { fetchMessaggi } from '../utils/fetchMessaggi';
import { fetchUploadMedia } from '../utils/fetchUploadMedia';

const socket = io(import.meta.env.VITE_API_URL);

export default function chatComponent() {

    const bottom = useRef();
    const inputFoto = useRef();
    const location = useLocation();
    const { userData } = useUserData();
    const { selectedChat } = useSelectedChat();
    const [messaggi, setMessaggi] = useState([]);
    const [contenuto, setContenuto] = useState("");
    const [percorso, setPercorso] = useState("");
    
    const handleCaricaFoto = () => {
        inputFoto.current.click();
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        try
        {   
            const file = inputFoto.current.files[0];
            if(!file) return;

            const ris = await fetchUploadMedia(file);
            setPercorso(ris.media);
        }
        catch(err)
        {
            console.error("error: ", err);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            try 
            {   
                const ris = await fetchMessaggi(selectedChat?.id);
                setMessaggi(ris);
            }
            catch (err) 
            {
                console.error("errore: ", err);
            }
        }

        if (!selectedChat?.id) return;
        fetch();
    }, [selectedChat]);
    
    // socket.io
    const handleSendMessage = (e) => {
        e.preventDefault();    
        if (!contenuto.trim()) return;

        const msg = { id_chat: selectedChat.id, id_utente: userData?.id, username: userData?.username, contenuto, media: percorso };
        socket.emit('send_message', msg);
        setContenuto("");
    };

    useEffect(() => {
        if (!selectedChat?.id) return;

        socket.emit('join_chat', selectedChat?.id);
        socket.on('receive_message', (msg) => {
            if (msg.id_chat === selectedChat?.id) setMessaggi((prev) => [...prev, msg]);
        });

        return () => socket.off('receive_message');
    }, [selectedChat]);

    useEffect(() => {
        if(messaggi.length > 4) bottom.current?.scrollIntoView({ behavior: "smooth" });
    }, [messaggi]);

    return(
        <>
            <div className="chat">
                <div className="head">
                    <div className='flex flex-row justify-start items-center'>
                        {
                            location.pathname === "/chat" ? 
                            (
                                <Link to="/home" style={{ marginRight: '1rem' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                                    </svg>
                                </Link>
                            ) : null
                        }
                        <div>
                            <img
                                src={`${import.meta. env. VITE_API_URL}/uploads/${selectedChat?.logo}`}
                                alt='chat-logo'
                                draggable="false"
                                className='rounded-full size-[50px]'
                            />
                        </div>
                        <span className='text-white text-lg'>
                            {selectedChat?.nome}
                        </span>
                    </div>
                    <div>
                        <Link to="/chat-settings" tabIndex={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-gear-wide-connected" viewBox="0 0 16 16">
                                <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z"/>
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="chat-content">
                    {
                        messaggi?.map((item) => (
                            <div key={item?.ID} className={item?.id_utente === userData?.id ? 'emiter' : 'destination'}>
                                <Message 
                                    key={item.ID} 
                                    messageText={item?.contenuto}
                                    media={item?.media} 
                                    autore={item?.username}
                                    data={item?.data_creazione}
                                />
                            </div>
                        ))
                    }
                    <div ref={bottom}></div>
                </div>

                <div className="chat-form-container">
                    <button type='button' onClick={handleCaricaFoto}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
                            <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707z"/>
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                        </svg>
                    </button>
                    
                    <input
                        type="file"
                        name="media"
                        id="media"
                        ref={inputFoto}
                        onChange={handleUpload}
                        className='hidden'
                    />
                    
                    <form className="chat-form" onSubmit={handleSendMessage}>
                        <textarea
                            id="message"
                            name="message"
                            cols={6}
                            placeholder='Scrivi un messaggio...'
                            className="h-[50px] w-full"
                            value={contenuto}
                            onChange={(e) => setContenuto(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) 
                                {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                            required
                        />
                        
                        <button type='submit'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}