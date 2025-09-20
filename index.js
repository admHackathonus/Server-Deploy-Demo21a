const http = require('http');
const os = require('os');

const PORT = process.env.PORT || 3000;
const startedAt = Date.now();

const server = http.createServer((req, res) => {
  if (req.url === '/status') {
    const mem = process.memoryUsage();
    const payload = {
      status: 'ok',
      uptime_seconds: Math.floor(process.uptime()),
      started_at: new Date(startedAt).toISOString(),
      host: os.hostname(),
      pid: process.pid,
      memory: { rss: mem.rss, heapUsed: mem.heapUsed },
      version: process.env.APP_VERSION || 'dev'
    };
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(payload));
    return;
  }

  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('Hello World\n');
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});