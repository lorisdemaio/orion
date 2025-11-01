import { useState } from "react";
import { toast } from "react-toastify";

// hook
import { useUserData } from "../../hook/userData";

// utils
import { fetchChangeUsername } from "../../utils/fetchChangeUsername";

export default function ChangeUsername({ visibility, func }) {

    const { userData, setUserData } = useUserData();
    const [username, setUsername] = useState("");

    const handleChangeUsername = async (e) => {
        e.preventDefault();
        try
        {
            const ris = await fetchChangeUsername(username, userData?.id);
            setUserData(prev => ({
                ...prev,
                username: ris.nuovoUsername
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
                <form onSubmit={handleChangeUsername}>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Inserisci nuovo username"
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