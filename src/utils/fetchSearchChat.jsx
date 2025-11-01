export const fetchSearchChat = async (nomeChat) => {
    try 
    {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/search-chat`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nomeChat })
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