import { useState } from "react";
import { toast } from "react-toastify";

// components
import Section from "../../components/section";
import ChangeFotoProfilo from "./changeFotoProfilo";
import ChangeUsername from "./changeUsername";
import ChangeEmail from "./changeEmail";
import ChangePassword from "./changePassword";

// hook
import { useUserData } from "../../hook/userData";

// utils
import { fetchDeleteAccount } from "../../utils/fetchDeleteAccount";

export default function Profile() {

    const { userData, setUserData } = useUserData();
    
    const [stateFotoProfilo, setStateFotoProfilo] = useState(false);
    const handleFotoProfilo = () => {
        setStateFotoProfilo(!stateFotoProfilo);
    }

    const [stateUsername, setStateUsername] = useState(false);
    const handleUsername = () => {
        setStateUsername(!stateUsername);
    }

    const [stateEmail, setStateEmail] = useState(false);
    const handleEmail = () => {
        setStateEmail(!stateEmail);
    }

    const [statePassword, setStatePassword] = useState(false);
    const handlePassword= () => {
        setStatePassword(!statePassword);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('selected-chat');
        setUserData(null);
        toast.success("Logout eseguito con successo.");
    }

    const handleDeleteAccount = async () => {
       const scelta = window.confirm("Sei sicuro di eliminare il tuo account?");
       if(scelta)
       {
            try
            {
                const ris = await fetchDeleteAccount(userData?.id);
                handleLogout();
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
                                src={`${import.meta.env.VITE_API_URL}/uploads/${userData?.foto}`}
                                alt="profile-img"
                                className="size-[100px] border border-white rounded-full"
                                draggable="false"
                            />
                        </div>
                        
                        <div className="flex flex-col justify-center items-center lg:items-start gap-2">
                            <span className="text-white font-semibold text-4xl">
                                @{userData?.username}
                            </span>
                            <span className="text-gray-500 ">
                                {userData?.email}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col justify-start items-start w-full" style={{ marginTop: '2.5rem' }}>
                        <button className="settings-btn" onClick={handleFotoProfilo}>
                            Modifica foto profilo
                        </button>
                        
                        <button className="settings-btn" onClick={handleUsername}>
                            Modifica username
                        </button>

                        <button className="settings-btn" onClick={handleEmail}>
                            Modifica email
                        </button>

                        <button className="settings-btn" onClick={handlePassword}>
                            Modifica password
                        </button>
                        
                        <button className="settings-btn" onClick={handleLogout}>
                            Log out
                        </button>
                        
                        <button className="settings-btn" onClick={handleDeleteAccount}>
                            Elimina account
                        </button>
                    </div>

                    <ChangeFotoProfilo visibility={stateFotoProfilo} func={handleFotoProfilo} />
                    <ChangeUsername visibility={stateUsername} func={handleUsername} />
                    <ChangeEmail visibility={stateEmail} func={handleEmail} />
                    <ChangePassword visibility={statePassword} func={handlePassword} />
                </div>
            </Section>
        </>
    );
}