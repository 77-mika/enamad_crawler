import axios from "axios";
import * as cheerio from "cheerio";
import Website from "../models/websites";

export const crawlPage = async (url: string): Promise<void> => {
  const response = await axios.get(url);

  const $ = cheerio.load(response.data);

  const rows = $("#Div_Content .row");

  console.log(`Found ${rows.length} rows`);

  for (const row of rows.toArray()) {
    const cols = $(row).children("div");

    if (cols.length < 8) continue;

    const domain =
      $(cols[1]).find("a").first().text().trim();

    const trustSealUrl =
      $(cols[1]).find("a").first().attr("href") || "";

    const name =
      $(cols[2]).text().trim();

    const province =
      $(cols[3]).text().trim();

    const city =
      $(cols[4]).text().trim();

    const stars =
      $(cols[5]).find("img").length;

    const grantDate =
      $(cols[6]).text().trim();

    const expiryDate =
      $(cols[7]).text().trim();

    await Website.updateOne(
      { domain },
      {
        domain,
        name,
        province,
        city,
        stars,
        grantDate,
        expiryDate,
        trustSealUrl,
      },
      { upsert: true }
    );

    console.log("Saved:", domain);
  }
};