import dotenv from "dotenv";
import connectDB from "./config/db";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 4000;

const startServer = async (): Promise<void> => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();