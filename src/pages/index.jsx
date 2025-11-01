import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '/orion_logo.webp';

// component
import Section from "../components/section";

export default function Index() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if(localStorage.getItem('token')) navigate("/home");
    }, []);

    return(
        <>
            <Section
                height="100dvh"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <div className="index-container">
                    <div className="flex flex-col justify-center items-center gap-15 w-full">
                        <div>
                            <img
                                src={logo}
                                alt="logo"
                                draggable="false"
                                className="size-[150px] rounded-2xl"
                            />
                        </div>

                        <div className="w-full lg:max-w-[700px]">
                            <p className="text-white text-center wrap-break-word">
                                Orion è la nuova generazione di messaggistica. Chatta, condividi e connettiti con chi vuoi, ovunque tu sia.
                            </p>
                        </div>
                    </div>
                    

                    <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:max-w-[700px]">
                        <Link className="primary-btn" to="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-door-open" viewBox="0 0 16 16">
                                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/>
                                <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/>
                            </svg>
                            <span>Accedi</span>
                        </Link>
                        <span className="hidden lg:block text-white text-lg">o</span>
                        <Link className="primary-btn" to="/register">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-person-add" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                            </svg>
                            <span>Registrati</span>
                        </Link>
                    </div>
                </div>
            </Section>
        </>
    );
}