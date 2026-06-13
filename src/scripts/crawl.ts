import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db";
import { crawlPage } from "../services/crawler.service";

(async () => {
  try {
    await connectDB();

    await crawlPage(
      process.env.ENAMAD_BASE_URL!
    );

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();