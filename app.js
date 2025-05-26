const express = require('express');
const app = express();
const PORT = 3000;

const startTime = Date.now();

app.get('/', (req, res) => {
  const uptime = Date.now() - startTime;
  const minutes = Math.floor(uptime / 60000);
  const seconds = Math.floor((uptime % 60000) / 1000);

  res.send(`<h1>🏁 Sports Timer App</h1><p>⏱ Uptime: ${minutes}m ${seconds}s</p>`);
});

app.listen(PORT, () => {
  console.log(`✅ Sports Timer app is running on port ${PORT}`);
});

