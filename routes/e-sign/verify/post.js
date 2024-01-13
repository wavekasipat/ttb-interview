const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const main = async (req, res) => {
    console.log(req.files);

    const { document } = req.files;
    const { signature } = req.body;

    // validate all required fields
    if (!document) {
        return res.status(400).send({
            error: "Invalid request",
        });
    }

    const public_key = fs.readFileSync(
        path.resolve(__dirname, "../../../keys/public-key.pem"),
        "utf8",
    );

    // verify the document
    const verifier = crypto.createVerify("RSA-SHA256");
    verifier.update(document.data);

    const verified = verifier.verify(public_key, signature, "base64");

    if (!verified) {
        return res.status(400).send({
            error: "Invalid signature",
        });
    }

    return res.send({
        verified,
    });
};

module.exports = main;
