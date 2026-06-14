import { Router, Response, Request } from "express";
import {
    getTopCities,
    getWebsitesPerCity,
    getWebsitesPerStars,
} from "../../services/stat.service";

const router = Router();

router.get("/cities", async (req: Request, res: Response) => {
    const results = await getWebsitesPerCity();
    res.json(results);
});

router.get("/stars", async (req: Request, res: Response) => {
    const results = await getWebsitesPerStars();
    res.json(results);
});

router.get("/top-cities", async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;

    const results = await getTopCities(limit);

    res.json(results);
});

export default router;
