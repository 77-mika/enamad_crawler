import { Router, Response, Request } from "express";
import {
    getTopCities,
    getWebsitesPerCity,
    getWebsitesPerStars,
} from "../../services/stat.service";

const router = Router();

/**
 * @swagger
 * /api/v1/stats/cities:
 *   get:
 *     summary: Get website counts grouped by city
 *     tags:
 *       - Statistics
 *     responses:
 *       200:
 *         description: An array of cities with the number of websites in each
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: City name
 *                   count:
 *                     type: integer
 */
router.get("/cities", async (req: Request, res: Response) => {
    const results = await getWebsitesPerCity();
    res.json(results);
});

/**
 * @swagger
 * /api/v1/stats/stars:
 *   get:
 *     summary: Get website counts grouped by star rating
 *     tags:
 *       - Statistics
 *     responses:
 *       200:
 *         description: An array of star ratings with the number of websites for each
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: number
 *                     description: Star rating
 *                   count:
 *                     type: integer
 */
router.get("/stars", async (req: Request, res: Response) => {
    const results = await getWebsitesPerStars();
    res.json(results);
});

/**
 * @swagger
 * /api/v1/stats/top-cities:
 *   get:
 *     summary: Get the cities with the most websites, sorted descending
 *     tags:
 *       - Statistics
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of cities to return
 *     responses:
 *       200:
 *         description: An array of top cities sorted by website count
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: City name
 *                   count:
 *                     type: integer
 */
router.get("/top-cities", async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;

    const results = await getTopCities(limit);

    res.json(results);
});

export default router;