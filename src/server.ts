import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import app from "./app";
import { apolloServer } from "./graphql/server";
import { expressMiddleware, ExpressMiddlewareOptions } from "@as-integrations/express5";
const PORT = process.env.PORT || 4000;

const startServer = async (): Promise<void> => {
    await connectDB();

    await apolloServer.start();

    /**
     * @swagger
     * /graphql:
     *   post:
     *     summary: GraphQL API endpoint
     *     description: |
     *       Single endpoint for all GraphQL queries and mutations.
     *       Send a JSON body containing a `query` string and optional `variables` / `operationName`.
     *     tags:
     *       - GraphQL
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - query
     *             properties:
     *               query:
     *                 type: string
     *                 description: The GraphQL query or mutation string
     *               variables:
     *                 type: object
     *                 description: Optional variables for the query
     *               operationName:
     *                 type: string
     *                 description: Optional operation name
     *           example:
     *             query: "query { websites { name domain stars } }"
     *     responses:
     *       200:
     *         description: GraphQL response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: object
     *                 errors:
     *                   type: array
     *                   items:
     *                     type: object
     */
    app.use(
        "/graphql",
        expressMiddleware(apolloServer)
    );

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Graphql running on http://localhost:${PORT}/graphql`);
    });
};

startServer();