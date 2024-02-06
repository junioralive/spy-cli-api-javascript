const puppeteer = require("puppeteer");
require("dotenv").config();

async function scrapeLogic(url) {
    try {
        const browser = await puppeteer.launch({
            args: [
              "--disable-setuid-sandbox",
              "--no-sandbox",
              "--single-process",
              "--no-zygote",
            ],
            executablePath:
              process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
          });
        const page = await browser.newPage();
        await page.goto(url);

        // Wait for the first button to be available
        await page.waitForSelector('a.btn.btn-primary', { visible: true });

        // Get the href attribute value of the first button
        const hrefFirst = await page.$eval('a.btn.btn-primary', link => link.getAttribute('href'));

        await page.goto(hrefFirst);

        // Wait for the success button to be available
        await page.waitForSelector('a.btn.btn-success.btn-lg.h6', { visible: true, timeout: 10000 });

        // Get the href attribute value of the success button
        const successButton = await page.$('a.btn.btn-success.btn-lg.h6');
        const hrefSecond = await page.evaluate(element => element.getAttribute("href"), successButton);

        await browser.close();

        return { success: true, link: hrefSecond };
    } catch (error) {
        return { success: false, error: error.toString() };
    }
}

module.exports = scrapeLogic;
