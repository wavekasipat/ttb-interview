const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const main = async (req, res) => {
    console.log(req.files);

    const { document } = req.files;

    // validate all required fields
    if (!document) {
        return res.status(400).send({
            error: "Invalid request",
        });
    }

    const private_key = fs.readFileSync(
        path.resolve(__dirname, "../../../keys/private-key.pem"),
        "utf8",
    );

    // sign the document
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(document.data);

    const signature = signer.sign(private_key, "base64");

    return res.send({
        signature,
    });
};

module.exports = main;
