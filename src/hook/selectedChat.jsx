import { useState, useEffect, createContext, useContext } from "react";

const SelectedChatContext = createContext();

export function SelectedChatProvider({ children }) {
    const [selectedChat, setSelectedChat] = useState(null);
    
    useEffect(() => {
        const stored = localStorage.getItem("selected-chat");
        if(!stored) return;

        try 
        {
            setSelectedChat(JSON.parse(stored));
        } 
        catch (error) 
        {
            console.error("Errore: ", error);
            setSelectedChat(null);
        }
    }, []);

    return(
        <SelectedChatContext.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </SelectedChatContext.Provider>
    );
}

export const useSelectedChat = () => useContext(SelectedChatContext);