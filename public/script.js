const socket = io();
const display = document.getElementById('display');

function start() {
  const sec = parseInt(document.getElementById('seconds').value);
  if (isNaN(sec) || sec <= 0) return alert("Enter a valid number of seconds");
  socket.emit('startTimer', sec);
}

socket.on('timeUpdate', time => {
  display.textContent = time;
});

socket.on('timerEnd', () => {
  alert("Time's up!");
});

