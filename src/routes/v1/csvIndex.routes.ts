import { Router, Request, Response } from "express";
import website from "../../models/websites";

const router = Router();

/**
 * @swagger
 * /api/v1/export-csv:
 *   get:
 *     summary: Export websites as a CSV file
 *     description: Returns a CSV file containing the requested fields for every website in the database.
 *     tags:
 *       - CSV Export
 *     parameters:
 *       - in: query
 *         name: fields
 *         required: true
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields to include (e.g. "name,url,city,stars")
 *         example: "name,domain,city,stars"
 *     responses:
 *       200:
 *         description: CSV file containing the requested fields
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing required "fields" query parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/", async (req: Request, res: Response) => {
    try {
        const fieldsParam = req.query.fields as string;

        if (!fieldsParam) {
            return res.status(400).json({
                message: "fields query parameter is required",
            });
        }

        const fields = (req.query.fields as string)?.split(",");

        const projection = fields.join(" ");

        const websites = await website.find({}, projection).lean();

        const headers = fields.join(",");

        const rows = websites.map((website) =>
            fields.map((field) => (website as any)[field]).join(","),
        );

        const csv = [headers, ...rows].join("\n");

        res.setHeader("Content-Type", "text/csv; charset=utf-8");

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=websites.csv",
        );

        res.send(csv);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

export default router;