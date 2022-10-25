export const signatureDigest = async(signature) => {
    const msgUint8 = new TextEncoder().encode(signature+'tXNOfkmHjXV-R6J2CmkyJIDAOIQ');
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}