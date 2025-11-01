export const fetchChangeChatLogo = async (logo, id) => {
    try
    {   
        const formData = new FormData();
        formData.append("logoChat", logo);
        formData.append("id", id);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/change-chat-logo`, {
            method: 'PATCH',
            body: formData
        });
        const data = await res.json();
        return data;
    }
    catch(err)
    {
        console.log("error: ", err);
    }
}