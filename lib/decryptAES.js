const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const keyString = process.env.AES_KEY;
const ivString = process.env.AES_IV;

const decryptAES = (text) => {
    const key = crypto
        .createHash("sha256")
        .update(keyString)
        .digest("base64")
        .substring(0, 32);
    const iv = Buffer.from(ivString, "hex");

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

module.exports = decryptAES;
