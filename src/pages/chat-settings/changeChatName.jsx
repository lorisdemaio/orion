import { useState } from "react";
import { toast } from "react-toastify";

// hook
import { useSelectedChat } from "../../hook/selectedChat";

// utils
import { fetchChangeNomeChat } from "../../utils/fetchChangeNomeChat";

export default function ChangeChatName({ visibility, func }) {

    const { selectedChat, setSelectedChat } = useSelectedChat();
    const [nuovoNome, setNuovoNome] = useState("");

    const handleChangeChatName = async (e) => {
        e.preventDefault();
        try
        {
            const ris = await fetchChangeNomeChat(nuovoNome, selectedChat?.id);
            setSelectedChat(prev => ({
                ...prev,
                nome: ris.nuovoNome
            }));
            toast.success(ris.mex);
        }
        catch(err)
        {
            console.error("err: ", err);
        }
    }

    return(
        <>
            <div className={`${visibility ? 'flex' : 'hidden'} overlay`} style={{ padding: "1rem" }}>
                <form onSubmit={handleChangeChatName}>
                    <input
                        type="text"
                        name="chatLogo"
                        id="chatLogo"
                        value={nuovoNome}
                        onChange={(e) => setNuovoNome(e.target.value)}
                        placeholder="Inserici nuovo nome"
                        required
                    />
                    <button type="submit" onClick={func}>
                        Modifica
                    </button>
                    <button type="button" onClick={func} tabIndex={0}>
                        Annulla
                    </button>
                </form>
            </div>
        </>
    );
}