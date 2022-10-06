import puppeteer  from "puppeteer";
import path from 'path';
import { fileURLToPath } from 'url';

export async function PuppeteerTest() {
  const url = 'http://127.0.0.1:3000/static/Puppeteer/';
  const browser = await puppeteer.launch()
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  setTimeout(async () => {
    await page.screenshot({
      path: 'screenshot.png'
    });
    await browser.close();
  }, 5*1000)
}

