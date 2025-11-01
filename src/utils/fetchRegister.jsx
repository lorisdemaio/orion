export const fetchRegister = async (username, email, password) => {
    try 
    {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();
        return data;
    }
    catch(err) 
    {
        console.error("err: ", err);
    }
}