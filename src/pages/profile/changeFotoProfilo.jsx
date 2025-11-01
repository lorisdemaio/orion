import { useState } from "react";
import { toast } from "react-toastify";

// hook
import { useUserData } from "../../hook/userData";

// utils
import { fetchChangeFotoProfilo } from "../../utils/fetchChangeFotoProfilo";

export default function ChangeFotoProfilo({ visibility, func }) {

    const { userData, setUserData } = useUserData();
    const [nuovaFoto, setNuovaFoto] = useState(null);

    const handleChangeFotoProfilo = async (e) => {
        e.preventDefault();
        try
        {
            const ris = await fetchChangeFotoProfilo(nuovaFoto, userData?.id);
            setUserData(prev => ({
                ...prev,
                foto: ris.percorso
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
                <form onSubmit={handleChangeFotoProfilo}>
                    <input
                        type="file"
                        name="fotoProfilo"
                        id="fotoProfilo"
                        onChange={(e) => setNuovaFoto(e.target.files[0])}
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