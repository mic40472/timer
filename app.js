const http = require('http');

let startTime = Date.now();

const server = http.createServer((req, res) => {
res.end('Hello from GCP Kubernetes!-2');
});

// Timer that logs uptime every 1 second
setInterval(() => {
const elapsedMs = Date.now() - startTime;
const seconds = Math.floor(elapsedMs / 1000) % 60;
const minutes = Math.floor(elapsedMs / 1000 / 60);
console.log('Server uptime: ${minutes}m ${seconds}s');
}, 1000);

server.listen(8080, () => {
console.log('Server running on port 8080');
});
