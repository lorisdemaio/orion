export const fetchCreateChat = async (id_utente1, id_utente2) => {
    try 
    {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/create-chat`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_utente1, id_utente2 })
        });
        const data = await res.json();
        return data;
    }

    catch(err) 
    {
        console.error("err: ", err);
    }
}