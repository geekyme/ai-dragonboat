// Minimal local dev server: node serve.mjs  ->  http://localhost:8765
// Not needed for GitHub Pages; the site is fully static.
import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { extname, join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
http.createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  // Dev helper: POST a base64 data URL to /__save/<file> to write it into assets/ (used to bake the OG image and icons).
  if (req.method === 'POST' && p.startsWith('/__save/')) {
    const name = basename(p.slice(8));
    if (!/^[\w.-]+$/.test(name)) { res.writeHead(400); return res.end('bad name'); }
    let body = ''; for await (const chunk of req) body += chunk;
    const b64 = body.replace(/^data:[^,]+,/, '');
    await mkdir(join(root, 'assets'), { recursive: true });
    await writeFile(join(root, 'assets', name), Buffer.from(b64, 'base64'));
    res.writeHead(200); return res.end('saved ' + name);
  }
  if (p === '/') p = '/index.html';
  try {
    const data = await readFile(join(root, p));
    res.writeHead(200, { 'Content-Type': types[extname(p)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  } catch { res.writeHead(404); res.end('not found'); }
}).listen(8765, '127.0.0.1', () => console.log('Dragon Boat running at http://localhost:8765'));
