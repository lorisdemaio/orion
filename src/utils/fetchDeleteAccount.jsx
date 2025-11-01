export const fetchDeleteAccount = async (id) => {
    try
    {   
        const res = await fetch(`${import.meta.env.VITE_API_URL}/delete-profile`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        const data = await res.json();
        return data;
    }
    catch(err)
    {
        console.log("error: ", err);
    }
}