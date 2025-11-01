import { useState, useEffect } from "react";
import { useUserData } from "../hook/userData";
import logo from '/orion_logo.webp';

export default function Loading() {
    
    const { loading } = useUserData();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(loading) setVisible(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);
    
    return(
        <>
            <div className={`loading ${visible ? 'opacity-[1] z-1000' : 'opacity-0 z-[-1]' }`}>
                <img
                    src={logo}
                    alt="logo"
                    draggable="false"
                    className="size-[300px] animate-pulse"
                />
            </div>
        </>
    );
}