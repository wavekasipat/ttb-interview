const express = require("express");
require("express-async-errors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.js");

const app = express();
const port = 3000;

// validate jwt for protected routes
app.use(require("./lib/validateJwt"));

// parse application/json
app.use(bodyParser.json());

// sample get route
// app.get("/", async (req, res) => {
//     return res.send({
//         message: "Hello World!",
//     });
// });

// // sample post route
// app.post("/", (req, res) => {
//     console.log(req.body);
//     return res.send({
//         message: "Hello World!",
//     });
// });

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// sample error route
app.get("/sample-error", async (req, res) => {
    throw new Error("Sample error");
});

app.post("/auth", require("./routes/auth/post"));

app.post("/customer", fileUpload(), require("./routes/customer/post"));
app.get("/customer/:cid", require("./routes/customer/[cid]/get"));
app.get(
    "/customer/:cid/facial-image",
    require("./routes/customer/[cid]/facial-image/get"),
);

app.post("/e-sign/sign", fileUpload(), require("./routes/e-sign/sign/post"));
app.post(
    "/e-sign/verify",
    fileUpload(),
    require("./routes/e-sign/verify/post"),
);

app.post(
    "/face-similarity",
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    }),
    require("./routes/face-similarity/post"),
);

// error handler
app.use(require("./lib/errorHandler"));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
