/*
 * Eenvoudige statische server voor de nieuwe site.
 * Draaien:  npm start   (of: node tools/serve.js)
 * Open daarna http://localhost:8000
 *
 * Serveert vanuit nieuwe-website/ als webroot, zodat de root-absolute paden
 * (/style.css, /images/...) kloppen. Open de bestanden dus niet als file://.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'nieuwe-website');
const PORT = process.env.PORT || 8000;
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain',
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  // Schone URL zonder extensie en zonder trailing slash (bijv. /websites) doorsturen
  // naar de variant met slash (/websites/), net als de live server (Hostinger/LiteSpeed).
  if (!p.endsWith('/') && !path.extname(p)) {
    res.writeHead(301, { Location: p + '/' }); res.end(); return;
  }
  if (p.endsWith('/')) p += 'index.html';
  const fp = path.join(ROOT, p);
  // voorkom uitbreken buiten ROOT
  if (!fp.startsWith(ROOT)) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('404 not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(fp).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Nieuwe site draait op http://localhost:${PORT}`));
