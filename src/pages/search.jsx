import { useState } from "react";
import { useNavigate } from "react-router";

// components
import Section from "../components/section";
import UserContainer from "../components/userContainer";

// hook
import { useSelectedChat } from "../hook/selectedChat";

// utils
import { fetchSearchChat } from "../utils/fetchSearchChat";

export default function Search() {

    const { setSelectedChat } = useSelectedChat();
    const navigate = useNavigate();
    const [nomeChat, setNomeChat ] = useState("");
    const [result, setResult] = useState([]);

    const fetch = async (e) => {
        e.preventDefault();
        try
        {
            const ris = await fetchSearchChat(nomeChat);
            setResult(ris);
        }
        catch(err)
        {
            console.error("err: ", err);
        }
    }

    const handleUserClick = async (id, logo, nome) => {
        const newSelectedChat = { id, logo, nome };

        localStorage.setItem("selected-chat", JSON.stringify(newSelectedChat));
        setSelectedChat(newSelectedChat);
        navigate("/chat");
    };

    return(
        <>
            <Section
                height="100vh"
                display="flex"
                justifyContent="flex-start"
                alignItems="start"
            >
                <div className="wrapper items-start">
                    <h1 className="text-white text-4xl font-semibold">
                        Cerca chat
                    </h1>
                    
                    <div className="flex justify-center w-full lg:max-w-[500px]" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                        <form className="chat-form" onSubmit={fetch}>
                            <input
                                name="search-chat"
                                id="search-chat"
                                type="text"
                                value={nomeChat}
                                onChange={(e) => setNomeChat(e.target.value)}
                                placeholder="Cerca chat..."
                                required
                            />
                            <button type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                    
                    <div className="flex flex-col justify-center gap-4 w-full lg:max-w-[500px]" style={{ marginTop: '1rem' }}>
                        {
                            result.length > 0 ?
                            (   
                                <>
                                    <h2 className="text-white text-3xl font-semibold" style={{ paddingBottom: "0.5rem" }}>
                                        Risultati
                                    </h2>
                                    {
                                        result.map((item) => (
                                        <UserContainer
                                            key={item.chat_id}
                                            profileImg={`${import.meta.env.VITE_API_URL}/uploads/${item.logo_chat}`}
                                            username={item.nome}
                                            click={() => handleUserClick(
                                                    `${item.chat_id}`, 
                                                    `${item.logo_chat}`, 
                                                    `${item.nome}
                                                `)
                                            }
                                        />
                                    ))
                                    }
                                </>
                            ) :
                            (
                                <span className="text-white text-lg">
                                    Nessun risultato
                                </span>
                            )
                        }
                    </div>
                </div>
            </Section>
        </>
    );
}