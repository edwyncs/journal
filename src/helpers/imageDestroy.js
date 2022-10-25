import { signatureDigest } from "./signatureDigest";

export const imageDestroy = async(imageUrl) => {

    if(!imageUrl) throw new Error('No image found');

    const segments = imageUrl.split('/');
    const imageId = 'journal/'+segments[segments.length -1].replace(/\..+$/, '');
    const timestamp = Math.round((new Date).getTime()/1000);

    const preSignature = `public_id=${imageId}&timestamp=${timestamp}`

    const signature = await signatureDigest(preSignature);

    const cloudUrl = 'https://api.cloudinary.com/v1_1/duddlt5mc/image/destroy';
    const formData = new FormData();
    formData.append('public_id', imageId);
    formData.append('signature', signature);
    formData.append('api_key', '664659354328968');
    formData.append('timestamp', timestamp);


    try {
        const resp = await fetch(cloudUrl,{
            method: 'POST',
            body: formData
        });

        if(!resp.ok) throw new Error('Could not delete image');

        const cloudResp = await resp.json();
        return cloudResp.result;
    } catch (error) {
        throw new Error(error.message);
    };
};