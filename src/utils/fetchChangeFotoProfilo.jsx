export const fetchChangeFotoProfilo = async (foto, id) => {
    try
    {   
        const formData = new FormData();
        formData.append("fotoProfilo", foto);
        formData.append("id", id);


        const res = await fetch(`${import.meta.env.VITE_API_URL}/change-foto-profilo`, {
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