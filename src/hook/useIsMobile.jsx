import { useState, useEffect } from "react";

export default function useIsMobile()
{   
    const [IsMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            if(window.innerWidth < 1024) setIsMobile(true);
            else setIsMobile(false);
        };  
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);   
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    return IsMobile;
}