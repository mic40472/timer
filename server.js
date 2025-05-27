// server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('New client connected');

  socket.on('startTimer', seconds => {
    let remaining = seconds;

    const timer = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(timer);
        socket.emit('timeUpdate', '00:00:00');
        socket.emit('timerEnd');
      } else {
        const hrs = String(Math.floor(remaining / 3600)).padStart(2, '0');
        const mins = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
        const secs = String(remaining % 60).padStart(2, '0');
        socket.emit('timeUpdate', `${hrs}:${mins}:${secs}`);
        remaining--;
      }
    }, 1000);

    socket.on('disconnect', () => clearInterval(timer));
  });
});

httpServer.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

