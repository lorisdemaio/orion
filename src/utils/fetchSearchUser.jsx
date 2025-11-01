export const fetchSearchUser = async (username, my_username) => {
    try 
    {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/search-user`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, my_username })
        });
        const data = await res.json();
        return data;
    }
    catch(err) 
    {
        console.error("err: ", err);
        return null;
    }
}