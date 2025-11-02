import { useEffect } from "react";
import { useNavigate } from "react-router";

// components
import Section from "../components/section";
import ChatComponent from "../components/chatComponent";

// hook
import useIsMobile from "../hook/useIsMobile";

export default function Chat() {

    const isMobile = useIsMobile();
    const navigate = useNavigate();

    useEffect(() => {
        const handleNavigate = () => {
            if(!isMobile) navigate("/home");
        }

        window.addEventListener('resize', handleNavigate);
        return () => removeEventListener('resize', handleNavigate);
    }, []);

    return(
        <>
            <Section
                height="100vh"
                display="flex"
                justifyContent="flex-start"
                alignItems="start"
            >
                <ChatComponent />
            </Section>
        </>
    );
}