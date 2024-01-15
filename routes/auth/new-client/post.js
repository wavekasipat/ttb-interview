const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const main = async (req, res) => {
    const prisma = new PrismaClient();

    // random secret length 32
    const client_secret =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    console.log(client_secret);

    // hash secret
    const hash = crypto.createHash("sha512");
    hash.update(client_secret);
    const hashed_secret = hash.digest("hex");

    // create new client
    const api_client = await prisma.api_client.create({
        data: {
            secret: hashed_secret,
        },
    });

    return res.send({
        client_id: api_client.id,
        client_secret: client_secret,
    });
};

module.exports = main;
