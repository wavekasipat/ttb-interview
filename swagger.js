const swaggerDocument = {
    swagger: "2.0",
    info: {
        version: "1.0.0",
        title: "ttb Interview Assignment",
        description: "API Document For Project ttb Interview Assignment",
        contact: {
            name: "Swagger API Team",
        },
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {
        "/auth": {
            post: {
                tags: ["auth"],
                summary: "Login",
                description: "Login",
                operationId: "login",
                parameters: [
                    {
                        name: "body",
                        in: "body",
                        description: "Login",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                client_id: {
                                    type: "string",
                                    example:
                                        "8d757981-27b4-4507-8ef4-d63faa838468",
                                },
                                client_secret: {
                                    type: "string",
                                    example: "M82ZJg29ugstoe29Cbc1ppimS1sm7wGK",
                                },
                            },
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Login",
                        schema: {
                            type: "object",
                            properties: {
                                token: {
                                    type: "string",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/customer": {
            post: {
                tags: ["customer"],
                summary: "Create Customer",
                description: "Create Customer",
                operationId: "createCustomer",
                consumes: ["multipart/form-data"],
                security: [
                    {
                        Bearer: [],
                    },
                ],
                parameters: [
                    {
                        name: "name",
                        in: "formData",
                        description: "Name",
                        required: true,
                        type: "string",
                    },
                    {
                        name: "surname",
                        in: "formData",
                        description: "Surname",
                        required: true,
                        type: "string",
                    },
                    {
                        name: "citizen_id",
                        in: "formData",
                        description: "Citizen ID",
                        required: true,
                        type: "string",
                    },
                    {
                        name: "facial",
                        in: "formData",
                        description: "Facial Image",
                        required: true,
                        type: "file",
                    },
                ],
                responses: {
                    200: {
                        description: "Create Customer",
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "string",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/customer/{cid}": {
            get: {
                tags: ["customer"],
                summary: "Get Customer",
                description: "Get Customer",
                operationId: "getCustomer",
                security: [
                    {
                        Bearer: [],
                    },
                ],
                parameters: [
                    {
                        name: "cid",
                        in: "path",
                        description: "Citizen ID",
                        required: true,
                        type: "string",
                    },
                ],
                responses: {
                    200: {
                        description: "Get Customer",
                        schema: {
                            type: "object",
                            properties: {
                                name: {
                                    type: "string",
                                },
                                surname: {
                                    type: "string",
                                },
                                citizen_id: {
                                    type: "string",
                                },
                                facial_image: {
                                    type: "string",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/customer/{cid}/facial-image": {
            get: {
                tags: ["customer"],
                summary: "Get Customer Facial Image",
                description: "Get Customer Facial Image",
                operationId: "getCustomerFacialImage",
                security: [
                    {
                        Bearer: [],
                    },
                ],
                parameters: [
                    {
                        name: "cid",
                        in: "path",
                        description: "Citizen ID",
                        required: true,
                        type: "string",
                    },
                ],
                responses: {
                    200: {
                        description: "Get Customer Facial Image",
                        schema: {
                            type: "string",
                            format: "binary",
                        },
                    },
                },
            },
        },
        "/e-sign/sign": {
            post: {
                tags: ["e-sign"],
                summary: "Sign",
                description: "Sign",
                operationId: "sign",
                consumes: ["multipart/form-data"],
                security: [
                    {
                        Bearer: [],
                    },
                ],
                parameters: [
                    {
                        name: "file",
                        in: "formData",
                        description: "File",
                        required: true,
                        type: "file",
                    },
                ],
                responses: {
                    200: {
                        description: "Sign",
                        schema: {
                            type: "object",
                            properties: {
                                signature: {
                                    type: "string",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/e-sign/verify": {
            post: {
                tags: ["e-sign"],
                summary: "Verify",
                description: "Verify",
                operationId: "verify",
                consumes: ["multipart/form-data"],
                security: [
                    {
                        Bearer: [],
                    },
                ],
                parameters: [
                    {
                        name: "file",
                        in: "formData",
                        description: "File",
                        required: true,
                        type: "file",
                    },
                    {
                        name: "signature",
                        in: "formData",
                        description: "Signature",
                        required: true,
                        type: "string",
                    },
                ],
                responses: {
                    200: {
                        description: "Verify",
                        schema: {
                            type: "object",
                            properties: {
                                verified: {
                                    type: "boolean",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/face-similarity": {
            post: {
                tags: ["face-similarity"],
                summary: "Face Similarity",
                description: "Face Similarity",
                operationId: "faceSimilarity",
                consumes: ["multipart/form-data"],
                security: [
                    {
                        Bearer: [],
                    },
                ],
                parameters: [
                    {
                        name: "file1",
                        in: "formData",
                        description: "File 1",
                        required: true,
                        type: "file",
                    },
                    {
                        name: "file2",
                        in: "formData",
                        description: "File 2",
                        required: true,
                        type: "file",
                    },
                ],
                responses: {
                    200: {
                        description: "Face Similarity",
                        schema: {
                            type: "object",
                            properties: {
                                distance: {
                                    type: "number",
                                },
                                isMatch: {
                                    type: "boolean",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/sample-error": {
            get: {
                tags: ["sample-error"],
                summary: "Sample Error",
                description: "Sample Error",
                operationId: "sampleError",
                responses: {
                    200: {
                        description: "Sample Error",
                    },
                },
            },
        },
    },
    securityDefinitions: {
        Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            description:
                'Enter the token with the `Bearer ` prefix, e.g. "Bearer abcde12345".',
        },
    },
};

module.exports = swaggerDocument;
