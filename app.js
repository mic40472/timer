class Stopwatch {
  constructor() {
    this.startTime = null;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.lapTimes = [];
  }

  start() {
    if (this.isRunning) {
      console.log('Stopwatch is already running!');
      return;
    }
   
    this.startTime = process.hrtime.bigint();
    this.isRunning = true;
    console.log('Stopwatch started');
  }

  stop() {
    if (!this.isRunning) {
      console.log('Stopwatch is not running!');
      return;
    }
   
    const endTime = process.hrtime.bigint();
    this.elapsedTime += Number(endTime - this.startTime) / 1000000; // Convert to milliseconds
    this.isRunning = false;
    console.log(`Stopwatch stopped. Total elapsed time: ${this.getFormattedTime()}`);
  }

  reset() {
    this.startTime = null;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.lapTimes = [];
    console.log('Stopwatch reset');
  }

  lap() {
    if (!this.isRunning) {
      console.log('Stopwatch is not running! Start it first.');
      return;
    }
   
    const currentTime = this.getCurrentTime();
    this.lapTimes.push(currentTime);
    console.log(`Lap ${this.lapTimes.length}: ${this.formatTime(currentTime)}`);
  }

  getCurrentTime() {
    if (!this.isRunning) {
      return this.elapsedTime;
    }
   
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
   
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  }

  getStatus() {
    console.log(`Status: ${this.isRunning ? 'Running' : 'Stopped'}`);
    console.log(`Current time: ${this.getFormattedTime()}`);
   
    if (this.lapTimes.length > 0) {
      console.log('Lap times:');
      this.lapTimes.forEach((lapTime, index) => {
        console.log(`  Lap ${index + 1}: ${this.formatTime(lapTime)}`);
      });
    }
  }
}

// Interactive CLI implementation
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const stopwatch = new Stopwatch();

function showMenu() {
  console.log('\n--- Stopwatch Menu ---');
  console.log('1. Start');
  console.log('2. Stop');
  console.log('3. Reset');
  console.log('4. Lap');
  console.log('5. Status');
  console.log('6. Exit');
  console.log('----------------------');
}

function handleUserInput() {
  rl.question('Enter your choice (1-6): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        stopwatch.start();
        break;
      case '2':
        stopwatch.stop();
        break;
      case '3':
        stopwatch.reset();
        break;
      case '4':
        stopwatch.lap();
        break;
      case '5':
        stopwatch.getStatus();
        break;
      case '6':
        console.log('Goodbye!');
        rl.close();
        return;
      default:
        console.log('Invalid choice. Please enter 1-6.');
    }
   
    setTimeout(() => {
      showMenu();
      handleUserInput();
    }, 100);
  });
}

// Start the application
console.log('Welcome to Node.js Stopwatch!');
showMenu();
handleUserInput();

// Example usage without CLI:
/*
const sw = new Stopwatch();
sw.start();
setTimeout(() => sw.lap(), 1000);
setTimeout(() => sw.lap(), 2000);
setTimeout(() => sw.stop(), 3000);
setTimeout(() => sw.getStatus(), 3100);
*/
