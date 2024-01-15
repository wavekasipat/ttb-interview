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
                            $ref: "#/definitions/LoginRequest",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Login",
                        schema: {
                            $ref: "#/definitions/LoginResponse",
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
                            $ref: "#/definitions/CreateCustomerResponse",
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
                            $ref: "#/definitions/GetCustomerResponse",
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
    },
    definitions: {
        LoginRequest: {
            type: "object",
            properties: {
                client_id: {
                    type: "string",
                    example: "8d757981-27b4-4507-8ef4-d63faa838468",
                },
                client_secret: {
                    type: "string",
                    example: "M82ZJg29ugstoe29Cbc1ppimS1sm7wGK",
                },
            },
        },
        LoginResponse: {
            type: "object",
            properties: {
                token: {
                    type: "string",
                },
            },
        },
        CreateCustomerResponse: {
            type: "object",
            properties: {
                status: {
                    type: "string",
                },
            },
        },
        GetCustomerResponse: {
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
