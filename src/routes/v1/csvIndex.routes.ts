import { Router, Request, Response } from "express";
import website from "../../models/websites";

const router = Router();

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
