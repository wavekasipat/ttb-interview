const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const errorHandler = async (err, req, res, next) => {
    console.log(err);
    try {
        const prisma = new PrismaClient();
        await prisma.system_log.create({
            data: {
                timestamp: new Date(),
                level: "error",
                message: err?.stack || err?.message || "Unknown error",
                url: req.url,
            },
        });
    } catch (error) {
        console.log("Error logging error");
        console.log(error);
    }
    res.status(500).send({
        error: err?.message,
        stack: err?.stack,
        id: uuidv4(),
    });
};

module.exports = errorHandler;
