// server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Setup __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firestore
const serviceAccount = JSON.parse(readFileSync('./gcp-service-account.json'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Express + Socket setup
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('New client connected');

  socket.on('startTimer', async seconds => {
    // Save timer start in Firestore
    await db.collection('timers').add({
      userId: socket.id,
      duration: seconds,
      status: 'running',
      startedAt: admin.firestore.Timestamp.now(),
    });

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

