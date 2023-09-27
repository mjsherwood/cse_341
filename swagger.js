const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/contacts.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Contact API",
        description: "API documentation for the Contact application"
    },
    host: "localhost:8080",
    basePath: "/contacts",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        Contact: {
            type: "object",
            properties: {
                contact: {
                    type: "object",
                    properties: {
                        firstName: { type: "string", example: "John" },
                        lastName: { type: "string", example: "Doe" },
                        email: { type: "string", example: "john.doe@example.com" },
                        favoriteColor: { type: "string", example: "Blue" },
                        birthday: { type: "string", example: "01/01/2000" }
                    }
                }
            }
        }
    }
};

swaggerAutogen(outputFile, endpointsFiles, doc)