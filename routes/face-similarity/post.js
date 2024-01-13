require("@tensorflow/tfjs-node");

const canvas = require("canvas");
const faceapi = require("face-api.js");

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.5,
});

const main = async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    const { facial1, facial2 } = req.files;

    // validate all required fields
    if (!facial1 || !facial2) {
        return res.status(400).send({
            error: "Invalid request",
        });
    }

    await faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights");
    await faceapi.nets.faceLandmark68Net.loadFromDisk("./weights");
    await faceapi.nets.faceRecognitionNet.loadFromDisk("./weights");

    const face1 = await canvas.loadImage(facial1.tempFilePath);
    const face2 = await canvas.loadImage(facial2.tempFilePath);

    const results1 = await faceapi
        .detectAllFaces(face1, faceDetectionOptions)
        .withFaceLandmarks()
        .withFaceDescriptors();
    const results2 = await faceapi
        .detectAllFaces(face2, faceDetectionOptions)
        .withFaceLandmarks()
        .withFaceDescriptors();

    if (!results1.length) {
        return res.status(400).send({
            error: "Face in file 1 not found",
        });
    }
    if (!results2.length) {
        return res.status(400).send({
            error: "Face in file 2 not found",
        });
    }

    const descriptor1 = results1[0].descriptor;
    const descriptor2 = results2[0].descriptor;

    console.log("descriptor1", descriptor1);

    const distance = faceapi.utils.round(
        faceapi.euclideanDistance(descriptor1, descriptor2),
    );
    console.log("distance", distance);

    const maxDistance = 0.6;
    let isMatch = false;
    if (distance <= maxDistance) {
        isMatch = true;
    }

    return res.send({
        distance,
        isMatch,
    });
};

module.exports = main;
