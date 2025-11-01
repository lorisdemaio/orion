export const fetchChangeUsername = async (nuovoUsername, id) => {
    try
    {   
        const res = await fetch(`${import.meta.env.VITE_API_URL}/change-username`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nuovoUsername, id })
        });
        const data = await res.json();
        return data;
    }
    catch(err)
    {
        console.log("error: ", err);
    }
}