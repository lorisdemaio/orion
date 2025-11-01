export const fetchChangePassword = async (nuovaPassword, id) => {
    try
    {   
        const res = await fetch(`${import.meta.env.VITE_API_URL}/change-password`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nuovaPassword, id })
        });
        const data = await res.json();
        return data;
    }
    catch(err)
    {
        console.log("error: ", err);
    }
}