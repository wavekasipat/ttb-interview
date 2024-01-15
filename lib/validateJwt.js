const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "secret";

const validateJwt = (req, res, next) => {
    const path = req.path;
    const method = req.method;

    const exactPublicAPIs = [
        {
            path: "/auth",
            method: "POST",
        },
        {
            path: "sample-error",
            method: "GET",
        },
    ];

    const startsWithPublicAPIs = [
        {
            path: "/doc",
            method: "GET",
        },
    ];

    // skip validation if path and method match
    if (
        exactPublicAPIs.some(
            (item) => item.path === path && item.method === method,
        ) ||
        startsWithPublicAPIs.some(
            (item) => path.startsWith(item.path) && item.method === method,
        )
    ) {
        return next();
    }

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send({
            error: "Unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.clientId = decoded.id;
        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).send({
            error: "Unauthorized",
        });
    }
};

module.exports = validateJwt;
