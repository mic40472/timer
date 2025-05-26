const express = require('express');
const app = express();
const PORT = 3000;

const startTime = Date.now();

<<<<<<< HEAD
app.get('/', (req, res) => {
  const uptime = Date.now() - startTime;
  const minutes = Math.floor(uptime / 60000);
  const seconds = Math.floor((uptime % 60000) / 1000);
=======
const server = http.createServer((req, res) => {
res.end('Hello from GCP Kubernetes!-2');
});
>>>>>>> efc7e31b9686f41cc63ea25a10bef4ee4ad84274

  res.send(`<h1>🏁 Sports Timer App</h1><p>⏱ Uptime: ${minutes}m ${seconds}s</p>`);
});

app.listen(PORT, () => {
  console.log(`✅ Sports Timer app is running on port ${PORT}`);
});

