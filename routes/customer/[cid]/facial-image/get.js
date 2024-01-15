const { PrismaClient } = require("@prisma/client");
const decryptAES = require("../../../../lib/decryptAES");
const crypto = require("crypto");

const main = async (req, res) => {
    const prisma = new PrismaClient();

    const { cid } = req.params;

    // hash citizen id with sha512
    const hash = crypto.createHash("sha512");
    hash.update(cid);
    const hashedCitizenId = hash.digest("hex");

    const customer = await prisma.customer.findUnique({
        where: {
            citizen_id: hashedCitizenId,
        },
    });

    if (!customer) {
        return res.status(404).send({
            error: "Not found customer",
        });
    }

    const decryptedFacialImage = decryptAES(customer.facial_image);

    // convert facial image from base64 to buffer
    const facialImage = Buffer.from(decryptedFacialImage, "base64");

    // set response header
    res.set("Content-Type", "image/jpeg");

    return res.send(facialImage);
};

module.exports = main;
