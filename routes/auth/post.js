const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "secret";
const { PrismaClient } = require("@prisma/client");

const main = async (req, res) => {
    const prisma = new PrismaClient();

    const { client_id, client_secret } = req.body;

    const api_client = await prisma.api_client.findUnique({
        where: {
            id: client_id,
        },
    });

    if (!api_client) {
        return res.status(401).send({
            error: "Not found client id",
        });
    }

    if (api_client.secret !== client_secret) {
        return res.status(401).send({
            error: "Invalid client secret",
        });
    }

    // generate token
    const token = jwt.sign(
        {
            id: client_id,
        },
        jwtSecret,
        { expiresIn: "1h" },
    );

    return res.send({
        token,
    });
};

module.exports = main;
