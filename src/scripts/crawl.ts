import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db";
import { crawlAllPages } from "../services/crawler.service";

(async () => {
  try {
    await connectDB();

    await crawlAllPages();

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();