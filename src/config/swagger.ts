import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Enamad Crawler API",
            version: "1.0.0",
            description:
                "Crawler, GraphQL API, CSV export, and statistics endpoints",
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },
    apis: ["./src/routes/**/*.ts", "./src/server.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;