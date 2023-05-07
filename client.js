// Create a WebSocket connection to the server
const socket = new WebSocket('ws://localhost:8080');

// Handle connection
socket.addEventListener('open', (event) => {
  console.log('Connected to server');
});

// Handle incoming messages from the server
socket.addEventListener('message', (event) => {
  const gameState = JSON.parse(event.data);
  // Update game world and UI
  // ...
});

// Handle disconnection
socket.addEventListener('close', (event) => {
  console.log('Disconnected from server');
});

// Send a message to the server
const message = { type: 'move', direction: 'north' };
socket.send(JSON.stringify(message));
