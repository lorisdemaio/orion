export const fetchUploadMedia = async (media) => {
    try
    {   
        const formdata = new FormData();
        formdata.append("media", media)

        const res = await fetch(`${import.meta.env.VITE_API_URL}/upload-media`, {
            method: 'POST',
            body: formdata
        });
        const data = await res.json();
        return data;
    }
    catch(err)
    {
        console.log("error: ", err);
    }
}