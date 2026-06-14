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
