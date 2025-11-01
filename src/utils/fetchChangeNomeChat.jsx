export const fetchChangeNomeChat = async (nuovoNome, id) => {
    try
    {   
        const res = await fetch(`${import.meta.env.VITE_API_URL}/change-chat-name`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nuovoNome, id })
        });
        const data = await res.json();
        return data;
    }
    catch(err)
    {
        console.log("error: ", err);
    }
}