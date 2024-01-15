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
    paths: [
        {
            "/auth": {
                post: {
                    tags: ["Auth"],
                    summary: "Login",
                    description: "Login",
                    operationId: "login",
                    consumes: ["application/json"],
                    produces: ["application/json"],
                    parameters: [
                        {
                            in: "body",
                            name: "body",
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
        },
        {
            "/customer": {
                post: {
                    tags: ["Customer"],
                    summary: "Create Customer",
                    description: "Create Customer",
                    operationId: "createCustomer",
                    consumes: ["multipart/form-data"],
                    produces: ["application/json"],
                    parameters: [
                        {
                            in: "formData",
                            name: "cid",
                            description: "Customer ID",
                            required: true,
                            type: "string",
                        },
                        {
                            in: "formData",
                            name: "name",
                            description: "Customer Name",
                            required: true,
                            type: "string",
                        },
                        {
                            in: "formData",
                            name: "email",
                            description: "Customer Email",
                            required: true,
                            type: "string",
                        },
                        {
                            in: "formData",
                            name: "phone",
                            description: "Customer Phone",
                            required: true,
                            type: "string",
                        },
                        {
                            in: "formData",
                            name: "address",
                            description: "Customer Address",
                            required: true,
                            type: "string",
                        },
                        {
                            in: "formData",
                            name: "document",
                            description: "Customer Document",
                            required: true,
                            type: "file",
                        },
                        {
                            in: "formData",
                            name: "facial_image",
                            description: "Customer Facial Image",
                            required: true,
                            type: "file",
                        },
                    ],
                    responses: {
                        200: {
                            description: "Create Customer",
                        },
                    },
                },
            },
        },
        {
            "/customer/{cid}": {
                get: {
                    tags: ["Customer"],
                    summary: "Get Customer",
                    description: "Get Customer",
                    operationId: "getCustomer",
                    consumes: ["application/json"],
                    produces: ["application/json"],
                    parameters: [
                        {
                            in: "path",
                            name: "cid",
                            description: "Customer ID",
                            required: true,
                            type: "string",
                        },
                    ],
                    responses: {
                        200: {
                            description: "Get Customer",
                        },
                    },
                },
            },
        },
    ],
    definitions: {
        LoginRequest: {
            type: "object",
            properties: {
                client_id: {
                    type: "string",
                },
                client_secret: {
                    type: "string",
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
    },
};

module.exports = swaggerDocument;
