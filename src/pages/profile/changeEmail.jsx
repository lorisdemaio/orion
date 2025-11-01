import { useState } from "react";
import { toast } from "react-toastify";

// hook
import { useUserData } from "../../hook/userData";

// utils
import { fetchChangeEmail } from "../../utils/fetchChangeEmail";

export default function ChangeEmail({ visibility, func }) {

    const { userData, setUserData } = useUserData();
    const [email, setEmail] = useState("");

    const handleChangeEmail = async (e) => {
        e.preventDefault();
        try
        {
            const ris = await fetchChangeEmail(email, userData?.id);
            setUserData(prev => ({
                ...prev,
                email: ris.nuovaEmail
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
                <form onSubmit={handleChangeEmail}>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Inserisci la nuova email"
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