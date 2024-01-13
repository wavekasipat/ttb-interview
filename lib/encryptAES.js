const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const keyString = process.env.AES_KEY;
const ivString = process.env.AES_IV;

const encryptAES = (text) => {
    const key = crypto
        .createHash("sha256")
        .update(keyString)
        .digest("base64")
        .substring(0, 32);
    const iv = Buffer.from(ivString, "hex");

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};

module.exports = encryptAES;
