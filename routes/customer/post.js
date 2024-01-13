const { PrismaClient } = require("@prisma/client");
const encryptAES = require("../../lib/encryptAES");
const crypto = require("crypto");

const main = async (req, res) => {
    const prisma = new PrismaClient();

    console.log(req.body);
    console.log(req.files);

    const { name, surname, citizen_id } = req.body;
    const { facial } = req.files;

    // validate all required fields
    if (!name || !surname || !citizen_id || !facial) {
        return res.status(400).send({
            error: "Invalid request",
        });
    }

    // convert facial image to base64
    const facialBase64 = facial.data.toString("base64");

    // hash citizen id with sha512
    const hash = crypto.createHash("sha512");
    hash.update(citizen_id);
    const encryptedCitizenId = hash.digest("hex");

    // encrypt all
    const encryptedName = encryptAES(name);
    const encryptedSurname = encryptAES(surname);
    const encryptedFacial = encryptAES(facialBase64);

    // check if customer already exists
    const customer = await prisma.customer.findUnique({
        where: {
            citizen_id: encryptedCitizenId,
        },
    });

    if (customer) {
        // update customer
        await prisma.customer.update({
            where: {
                id: customer.id,
            },
            data: {
                name: encryptedName,
                surname: encryptedSurname,
                facial_image: encryptedFacial,
            },
        });
    } else {
        // create customer
        await prisma.customer.create({
            data: {
                name: encryptedName,
                surname: encryptedSurname,
                citizen_id: encryptedCitizenId,
                facial_image: encryptedFacial,
            },
        });
    }

    return res.send({
        status: "success",
    });
};

module.exports = main;
