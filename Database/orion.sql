-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Nov 01, 2025 alle 18:22
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `orion`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `chats`
--

CREATE TABLE `chats` (
  `ID` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `logo_chat` varchar(255) DEFAULT NULL,
  `data_creazione` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `chats`
--

INSERT INTO `chats` (`ID`, `nome`, `logo_chat`, `data_creazione`) VALUES
(9, 'Chat tra lori e mario', 'chat_default.webp', '2025-11-01 15:51:49'),
(10, 'Chat tra antonio e lori', 'chat_default.webp', '2025-11-01 15:53:28');

-- --------------------------------------------------------

--
-- Struttura della tabella `membri_chat`
--

CREATE TABLE `membri_chat` (
  `ID_chat` int(11) NOT NULL,
  `ID_utente` int(11) NOT NULL,
  `data_join` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `membri_chat`
--

INSERT INTO `membri_chat` (`ID_chat`, `ID_utente`, `data_join`) VALUES
(9, 5, '2025-11-01 15:51:49'),
(9, 6, '2025-11-01 15:51:49'),
(10, 5, '2025-11-01 15:53:28'),
(10, 7, '2025-11-01 15:53:28');

-- --------------------------------------------------------

--
-- Struttura della tabella `messaggi`
--

CREATE TABLE `messaggi` (
  `ID` int(11) NOT NULL,
  `contenuto` text NOT NULL,
  `media` varchar(255) NOT NULL,
  `data_creazione` datetime DEFAULT current_timestamp(),
  `ID_chat` int(11) NOT NULL,
  `ID_utente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `messaggi`
--

INSERT INTO `messaggi` (`ID`, `contenuto`, `media`, `data_creazione`, `ID_chat`, `ID_utente`) VALUES
(107, 'Ciao, come va con la progettazione dell\'app?', '', '2025-11-01 18:06:35', 10, 7),
(108, 'bene ho fatto il diagramma E-R', '1762016871890.jpg', '2025-11-01 18:07:53', 10, 5);

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `ID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `foto_profilo` varchar(255) DEFAULT NULL,
  `data_creazione` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`ID`, `username`, `email`, `password`, `foto_profilo`, `data_creazione`) VALUES
(5, 'lori', 'lori@orion.it', '$2b$10$sMFh4JIWbBbNHn/wMVOG3eETex6cDxN8q2jixKfmZFyowJEjT2LFe', 'default.webp', '2025-11-01 15:45:14'),
(6, 'mario', 'mario@orion.it', '$2b$10$4gsr1BWAtrA6KLPPak3Q5eWg5Y5EkDKmdWQ593ccqWT0/1TM1q1za', 'default.webp', '2025-11-01 15:49:20'),
(7, 'antonio', 'antonio@orion.it', '$2b$10$8eilOMMvmHq/bT871Kx/k.jtaxTg70WA9DNWCkVWxCYhyRgqIemfa', 'default.webp', '2025-11-01 15:53:10');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`ID`);

--
-- Indici per le tabelle `membri_chat`
--
ALTER TABLE `membri_chat`
  ADD PRIMARY KEY (`ID_chat`,`ID_utente`),
  ADD KEY `idx_membri_chat` (`ID_chat`),
  ADD KEY `idx_membri_utente` (`ID_utente`);

--
-- Indici per le tabelle `messaggi`
--
ALTER TABLE `messaggi`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `idx_messaggi_chat` (`ID_chat`),
  ADD KEY `idx_messaggi_utente` (`ID_utente`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `chats`
--
ALTER TABLE `chats`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT per la tabella `messaggi`
--
ALTER TABLE `messaggi`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `membri_chat`
--
ALTER TABLE `membri_chat`
  ADD CONSTRAINT `fk_membri_chat_chat` FOREIGN KEY (`ID_chat`) REFERENCES `chats` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_membri_chat_utente` FOREIGN KEY (`ID_utente`) REFERENCES `utenti` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `messaggi`
--
ALTER TABLE `messaggi`
  ADD CONSTRAINT `fk_messaggi_chat` FOREIGN KEY (`ID_chat`) REFERENCES `chats` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_messaggi_utente` FOREIGN KEY (`ID_utente`) REFERENCES `utenti` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
