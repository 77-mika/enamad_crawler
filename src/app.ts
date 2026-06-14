import express, { Application, Request, Response, NextFunction } from "express";
import V1Router from "./routes/v1/index";
const app: Application = express();
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", V1Router);

app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "ok" });
});

export default app;
