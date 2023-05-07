# kurwa
Self referential Multi User Dungeon programming challenge, an introduction to programs that curve-in on themselves.

MUDs are typically text-based games that are played over the internet, where players explore a virtual world, interact with other players, and complete quests or challenges.

Server:

- Set up a Node.js server using the http module to handle incoming requests.
- Define a simple protocol for the server-client communication, for example, messages that represent user commands or updates to the game state.
- Implement a game world model that keeps track of the current state of the game, including player locations, items, and NPCs (non-player characters).
- Define the logic for processing user commands and updating the game world state accordingly.
- Use a WebSocket connection to enable real-time communication between the server and the clients.
- Set up event listeners for incoming messages from clients, and send updates to clients when the game state changes.

Client:

- Create an HTML page that displays the game world and user interface.
- Use JavaScript and the WebSocket API to establish a connection to the server.
- Define the logic for processing user input and sending commands to the server.
- Set up event listeners for incoming messages from the server, and update the game world and UI accordingly.
- Use CSS to style the UI and create a visually appealing game environment.
