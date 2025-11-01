import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "./userData";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { userData } = useUserData();

    useEffect(() => {
        if(!userData || !localStorage.getItem('token')) navigate("/");
    }, [userData, localStorage.getItem('token')]);

    return children;
}