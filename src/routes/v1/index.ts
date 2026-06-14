import { getWebsitesPerCity } from "../../services/stat.service";
import { Router } from "express";
import csvRouter from "./csvIndex.routes"
import statsRouter from "./stat.routes"

const router = Router();

router.use("/v1/export-csv",csvRouter);
router.use("/v1/stats",statsRouter)

export default router;
