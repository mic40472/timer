const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

class Stopwatch {
  constructor() {
    this.startTime = null;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.lapTimes = [];
  }

  start() {
    if (this.isRunning) return { message: 'Stopwatch already running' };
    this.startTime = process.hrtime.bigint();
    this.isRunning = true;
    return { message: 'Stopwatch started' };
  }

  stop() {
    if (!this.isRunning) return { message: 'Stopwatch is not running' };
    const endTime = process.hrtime.bigint();
    this.elapsedTime += Number(endTime - this.startTime) / 1000000;
    this.isRunning = false;
    return { message: `Stopwatch stopped`, elapsed: this.getFormattedTime() };
  }

  reset() {
    this.startTime = null;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.lapTimes = [];
    return { message: 'Stopwatch reset' };
  }

  lap() {
    if (!this.isRunning) return { message: 'Start the stopwatch first' };
    const currentTime = this.getCurrentTime();
    this.lapTimes.push(currentTime);
    return {
      message: `Lap ${this.lapTimes.length}`,
      lapTime: this.formatTime(currentTime),
    };
  }

  getCurrentTime() {
    if (!this.isRunning) return this.elapsedTime;
    const currentTime = process.hrtime.bigint();
    return this.elapsedTime + (Number(currentTime - this.startTime) / 1000000);
  }

  getFormattedTime() {
    return this.formatTime(this.getCurrentTime());
  }

  formatTime(timeInMs) {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(timeInMs % 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  }

  getStatus() {
    return {
      status: this.isRunning ? 'Running' : 'Stopped',
      currentTime: this.getFormattedTime(),
      laps: this.lapTimes.map((lap, idx) => ({
        lap: idx + 1,
        time: this.formatTime(lap),
      })),
    };
  }
}

const stopwatch = new Stopwatch();

// REST API Routes
app.get('/', (req, res) => res.send('Welcome to the Stopwatch API!'));

app.post('/start', (req, res) => res.json(stopwatch.start()));
app.post('/stop', (req, res) => res.json(stopwatch.stop()));
app.post('/reset', (req, res) => res.json(stopwatch.reset()));
app.post('/lap', (req, res) => res.json(stopwatch.lap()));
app.get('/status', (req, res) => res.json(stopwatch.getStatus()));

// Start server
app.listen(PORT, () => {
  console.log(`Stopwatch API server running on port ${PORT}`);
});

