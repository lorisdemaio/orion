export const fetchFotoProfilo = async (id) => {
    try
    {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/${id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
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