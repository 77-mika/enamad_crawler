import express, { Application, Request, Response, NextFunction } from "express";
import csvRouter from './routes/v1/csvIndex.routes'
import V1Router from './routes/v1/index'
const app: Application = express();

app.use(express.json());

app.use("/api",V1Router)

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

export default app;