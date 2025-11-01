import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// components
import Section from "../components/section";
import UserButton from "../components/userButton"

// hook
import { useUserData } from "../hook/userData";

// utils
import { fetchSearchUser } from "../utils/fetchSearchUser";
import { fetchCreateChat } from "../utils/fetchCreateChat";

export default function CreateChat() {

    const { userData } = useUserData();
    const navigate = useNavigate();
    const [username, setUsername ] = useState("");
    const [result, setResult] = useState([]);

    const handleCreateChat = async (id) => {
         try 
         {
            const ris = await fetchCreateChat(id, userData?.id);
            navigate("/home");
            toast.info(ris.mex);
        }
        catch(err) 
        {
            console.error("err: ", err);
        }
    }

    const fetch = async (e) => {
        e.preventDefault();
        try
        {
            const ris = await fetchSearchUser(username, userData?.username);
            setResult(ris);
        }
        catch(err)
        {
            console.error("err: ", err);
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
                <div className="wrapper items-start">
                    <h1 className="text-white text-4xl font-semibold">
                        Nuova Chat
                    </h1>
                    
                    <div className="flex justify-center w-full lg:max-w-[500px]" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                        <form className="chat-form" onSubmit={fetch}>
                            <input
                                name="search-user"
                                id="search-user"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Cerca utenti..."
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
                                            <UserButton
                                                key={item.ID}
                                                profileImg={`${import.meta.env.VITE_API_URL}/uploads/${item.foto_profilo}`}
                                                username={item.username}
                                                click ={() => handleCreateChat(`${item.ID}`)}
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