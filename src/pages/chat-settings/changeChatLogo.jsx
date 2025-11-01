import { useState } from "react";
import { toast } from "react-toastify";

// hook
import { useSelectedChat } from "../../hook/selectedChat";

// utils
import { fetchChangeChatLogo } from "../../utils/fetchChangeChatLogo";

export default function ChangeChatLogo({ visibility, func }) {

    const { selectedChat, setSelectedChat } = useSelectedChat();
    const [nuovoLogo, setNuovoLogo] = useState(null);

    const handleChangeChatLogo = async (e) => {
        e.preventDefault();
        try
        {
            const ris = await fetchChangeChatLogo(nuovoLogo, selectedChat?.id);
            setSelectedChat(prev => ({
                ...prev,
                logo: ris.percorso
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
                <form onSubmit={handleChangeChatLogo}>
                    <input
                        type="file"
                        name="chatLogo"
                        id="chatLogo"
                        onChange={(e) => setNuovoLogo(e.target.files[0])}
                        accept="image/*" 
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