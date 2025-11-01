export const fetchLogin = async (email, password) => {
    try 
    {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        return data;
    }

    catch(err) 
    {
        console.error("err: ", err);
    }
}