import { crypto } from './imports.js'


export function encrypt(password, data) {  
    const salt = crypto.randomBytes(16).toString('hex'); 
    const iv = crypto.randomBytes(16); 
    const keyLength = 32; 
    const derivedKey = crypto.scryptSync(password, salt, keyLength);  
    const cipher = crypto.createCipheriv('aes-256-cbc', derivedKey, iv);  
    let encrypted = cipher.update(data, 'utf8', 'hex');  
    encrypted += cipher.final('hex');     
    return { salt, iv: iv.toString('hex'), encrypted };  
}  
export function decrypt(password, salt, ivHex, encryptedData) {  
    const keyLength = 32;  
    const derivedKey = crypto.scryptSync(password, salt, keyLength);  
    const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, Buffer.from(ivHex, 'hex'));  
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');  
    decrypted += decipher.final('utf8');  
    return decrypted;  
}  
// const password = 'admin';  
// const message = 'Hello, World!';  
// const { salt, iv, encrypted } = encrypt(password, message);  
// const decrypted = decrypt(password, salt, iv, encrypted);  
// console.log('Decrypted:', decrypted);
