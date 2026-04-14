import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 8787;

const server = createServer(async (req, res) => {
  const path = req.url?.split('?')[0] ?? '/';
  if (path === '/deals.json' || path === '/api/deals') {
    try {
      const jsonPath = join(__dirname, '../public/deals.json');
      const data = await readFile(jsonPath, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(data);
    } catch {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Failed to load deals');
    }
    return;
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Deals static API at http://127.0.0.1:${PORT}/deals.json`);
});
