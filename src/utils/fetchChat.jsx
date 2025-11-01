export const fetchChat = async (id) => {
    try
    {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/chat/${id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        return data;
    }
    catch(err)
    {
        console.log("error: ", err);
    }
}