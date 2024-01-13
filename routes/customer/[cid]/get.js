const { PrismaClient } = require("@prisma/client");
const decryptAES = require("../../../lib/decryptAES");
const crypto = require("crypto");

const main = async (req, res) => {
    const prisma = new PrismaClient();

    const { cid } = req.params;

    // hash citizen id with sha512
    const hash = crypto.createHash("sha512");
    hash.update(cid);
    const encryptedCitizenId = hash.digest("hex");

    const customer = await prisma.customer.findUnique({
        where: {
            citizen_id: encryptedCitizenId,
        },
    });

    if (!customer) {
        return res.status(404).send({
            error: "Not found customer",
        });
    }

    const decryptedName = decryptAES(customer.name);
    const decryptedSurname = decryptAES(customer.surname);
    const decryptedFacialImage = decryptAES(customer.facial_image);

    return res.send({
        name: decryptedName,
        surname: decryptedSurname,
        citizen_id: cid,
        facial_image: decryptedFacialImage,
    });
};

module.exports = main;
