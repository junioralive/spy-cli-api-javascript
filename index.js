const express = require("express");
const scrapeLogic = require("./scrapeLogic");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/scrape", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("URL parameter is required");
  }
  try {
    const result = await scrapeLogic(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
  }
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});