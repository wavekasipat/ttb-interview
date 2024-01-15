const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "secret";
const jwtExpire = process.env.JWT_EXPIRE || "1h";
const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const main = async (req, res) => {
    const prisma = new PrismaClient();

    const { client_id, client_secret } = req.body;

    // hash secret
    const hash = crypto.createHash("sha512");
    hash.update(client_secret);
    const hashed_secret = hash.digest("hex");

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

    if (api_client.secret !== hashed_secret) {
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
        { expiresIn: jwtExpire },
    );

    return res.send({
        token,
    });
};

module.exports = main;
