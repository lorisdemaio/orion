import { useState, useEffect, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) return;

         try 
         {
            const decoded = jwtDecode(token);
            setUserData(decoded);
        } 
        catch (error) 
        {
            console.error("Error decoding token:", error);
            setUserData(null);
            setLoading(true);
        }
        finally
        {
            setLoading(false);
        }
    }, []);

    return(
        <UserContext.Provider value={{ userData, setUserData, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserData = () => useContext(UserContext);