import CryptoJS from "crypto-js";

export const encrypt = (data: unknown) => {
    if (process.env.AES === "off") {
        return data;
    }

    const dataString = typeof data === 'string' ? data : JSON.stringify(data);
    
    const secretKey = process.env.AES_SECRET_KEY;
    if (!secretKey) {
        throw new Error("Secret key is not set");
    }
    return CryptoJS.AES.encrypt(dataString, secretKey).toString();
};

export const decrypt = (ciphertext: string) => {
    if (process.env.AES === "off") {
        return ciphertext;
    }
    const secretKey = process.env.AES_SECRET_KEY;
    if (!secretKey) {
        throw new Error("Secret key is not set");
    }
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
};
