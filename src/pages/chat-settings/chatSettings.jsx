import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// components
import Section from "../../components/section";
import ChangeChatLogo from "./changeChatLogo";
import ChangeChatName from "./changeChatName";

// hook
import { useSelectedChat } from "../../hook/selectedChat";

// utils
import { fetchDeleteChat } from "../../utils/fetchDeleteChat";

export default function ChatSettings() {

    const { selectedChat } = useSelectedChat();
    const navigate = useNavigate();

    const [stateChatLogo, setStateChatLogo] = useState();
    const handleChatLogo = () => {
        setStateChatLogo(!stateChatLogo);
    }

    const [stateChatName, setStateChatName] = useState();
    const handleChatName = () => {
        setStateChatName(!stateChatName);
    }
    
    const handleDeleteChat = async () => {
       const scelta = window.confirm("Sei sicuro di eliminare la chat?");
       if(scelta) 
       {
         try
         {
             const ris = await fetchDeleteChat(selectedChat?.id);
             navigate("/home");
             toast.success(ris.mex);
         }
         catch(err)
         {
             console.error("errore: ", err);
         }
       }
    }

    return(
        <>
            <Section
                height="100vh"
                display="flex"
                justifyContent="flex-start"
                alignItems="start"
            >
                <div className="wrapper items-center lg:items-start">
                    <div className="flex flex-col lg:flex-row justify-start items-center gap-4">
                        <div className="flex justify-center items-center">
                            <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${selectedChat?.logo}`}
                                alt="profile-img"
                                className="size-[100px] border border-white rounded-full"
                                draggable="false"
                            />
                        </div>
                        
                        <div className="flex flex-col justify-center items-center lg:items-start gap-2">
                            <span className="text-white font-semibold text-4xl">
                                {selectedChat?.nome}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col justify-start items-start w-full" style={{ marginTop: '2.5rem' }}>
                        <button className="settings-btn" onClick={handleChatLogo}>
                            Modifica logo
                        </button>
                        
                        <button className="settings-btn" onClick={handleChatName}>
                            Modifica nome
                        </button>

                        <button className="settings-btn hidden">
                        </button>

                        <button className="settings-btn" onClick={handleDeleteChat}>
                            Elimina chat
                        </button>
                    </div>

                    <ChangeChatLogo visibility={stateChatLogo} func={handleChatLogo} />
                    <ChangeChatName visibility={stateChatName} func={handleChatName} />
                </div>
            </Section>
        </>
    );
}