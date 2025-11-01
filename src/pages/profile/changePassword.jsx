import { useState } from "react";
import { toast } from "react-toastify";

// hook
import { useUserData } from "../../hook/userData";

// utils
import { fetchChangePassword } from '../../utils/fetchChangePassword';

export default function ChangePassword({ visibility, func }) {

    const { userData } = useUserData();
    const [password, setPassword] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try
        {
            const ris = await fetchChangePassword(password, userData?.id);
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
                <form onSubmit={handleChangePassword}>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Inserisci la nuova password"
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