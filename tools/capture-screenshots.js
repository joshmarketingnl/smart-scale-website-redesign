/*
 * Maakt screenshots van een lijst sites met Playwright (Chromium).
 *
 * Eenmalig installeren:
 *   npm install playwright
 *   npx playwright install chromium
 *
 * Draaien (vanuit de repo-root):
 *   node tools/capture-screenshots.js
 *
 * Output: screenshots/<naam>.png (+ <naam>-full.png als full:true).
 * De nieuwe site wordt lokaal geserveerd zodat de root-absolute paden kloppen.
 */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'screenshots');
const NEW_ROOT = path.join(ROOT, 'nieuwe-website');
fs.mkdirSync(OUT, { recursive: true });

// Pas deze lijst aan om meer (klant)sites toe te voegen.
const targets = [
  { name: 'smart-scale-nieuw', url: 'http://localhost:8011/', full: true }, // lokale nieuwe site
  { name: 'smart-scale-oud',   url: 'https://smart-scale.ai/',  full: true },
  { name: 'demo-garage',       url: 'https://smart-scale.ai/garage-demo/' },
  { name: 'demo-schoonheid',   url: 'https://smart-scale.ai/schoonheid-demo/' },
  { name: 'demo-shopify',      url: 'https://smart-scale.ai/shopify-demo/' },
  // { name: 'klant-x', url: 'https://klant-x.nl', full: true },
];

const mime = { '.html':'text/html','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ico':'image/x-icon','.woff2':'font/woff2' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const fp = path.join(NEW_ROOT, p);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('nf'); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(fp).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
});

(async () => {
  await new Promise(r => server.listen(8011, r));
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  for (const t of targets) {
    const page = await ctx.newPage();
    try {
      await page.goto(t.url, { waitUntil: 'load', timeout: 45000 });
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(OUT, `${t.name}.png`) });
      if (t.full) await page.screenshot({ path: path.join(OUT, `${t.name}-full.png`), fullPage: true });
      console.log('ok  ', t.name);
    } catch (e) {
      console.log('FAIL', t.name, String(e.message || e).slice(0, 100));
    }
    await page.close();
  }
  await browser.close();
  server.close();
})();
