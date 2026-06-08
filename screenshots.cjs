// screenshots.cjs
// Capture responsive screenshots of the CareerDream site using Puppeteer (CommonJS)
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const url = 'http://localhost:5173';
  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ];
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    const screenshotPath = path.join(__dirname, `screenshot_${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Saved ${vp.name} screenshot to ${screenshotPath}`);
    await page.close();
  }
  await browser.close();
})();
