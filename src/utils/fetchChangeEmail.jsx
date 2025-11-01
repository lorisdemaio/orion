export const fetchChangeEmail = async (nuovaEmail, id) => {
    try
    {   
        const res = await fetch(`${import.meta.env.VITE_API_URL}/change-email`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nuovaEmail, id })
        });
        const data = await res.json();
        return data;
    }
    catch(err)
    {
        console.log("error: ", err);
    }
}