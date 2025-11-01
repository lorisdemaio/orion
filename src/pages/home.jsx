import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// components
import Section from "../components/section";
import UserContainer from '../components/userContainer'
import ChatComponent from "../components/chatComponent";

// hook
import useIsMobile from "../hook/useIsMobile";
import { useUserData } from "../hook/userData";
import { useSelectedChat } from "../hook/selectedChat";

// utils
import { fetchChat } from "../utils/fetchChat";

export default function Home() {

    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { userData } = useUserData();
    const { selectedChat, setSelectedChat } = useSelectedChat();
    const [chat, setChat] = useState([]);

    const handleUserClick = async (id, logo, nome) => {
        const newSelectedChat = { id, logo, nome };

        localStorage.setItem("selected-chat", JSON.stringify(newSelectedChat));
        setSelectedChat(newSelectedChat);

        if (isMobile) navigate(`/chat`);
    };

    // fetchChat    
    useEffect(() => {
        const fetch = async () => {
            try 
            {   
                const ris = await fetchChat(userData?.id);
                setChat(ris);

                if(!chat.length > 0) setSelectedChat(false);
            }
            catch (err) 
            {
                console.error("errore: ", err);
            }
        }

        if(!userData) return;
        fetch();
    }, [userData]);

    return(
        <>
            <Section
                height="100vh"
                display="flex"
                justifyContent="flex-start"
                alignItems="start"
            >
                <div className="home-wrapper">
                    <div className="chat-list">
                        <div className="head" id="head-list">
                            <h1>
                                Chat
                            </h1>
                        </div>
                        <div className="chat-list-content">
                            {
                                chat.length > 0 ?
                                (
                                    chat.map((item) => (
                                        <UserContainer
                                            key={item.chat_id}
                                            profileImg={`${import.meta.env.VITE_API_URL}/uploads/${item.logo_chat}`}
                                            username={item.nome}
                                            click={ () => handleUserClick( 
                                                    `${item.chat_id}`, 
                                                    `${item.logo_chat}`, 
                                                    `${item.nome}
                                                `)
                                            }
                                        />
                                    ))
                                ) :
                                (
                                    <span className="text-white text-lg">
                                        Non hai chat recenti.
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        {
                            selectedChat ?
                            (
                                <ChatComponent />
                            ) :
                            (
                                <div className="h-screen w-full flex justify-center items-center">
                                    <span className="text-white text-lg">
                                        Nessuna chat selezionata.
                                    </span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </Section>
        </>
    );
}