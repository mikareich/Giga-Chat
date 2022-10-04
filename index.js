// build-in modules
const http = require("http");

// create a express server
const express = require("express");
const app = express();
const server = http.createServer(app);

// create socket-io server
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = 3000;

const typingUsers = [];

// localhost:3000/

app.use(express.static("public"));

// listen for connections
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("enableTyping", (name) => {
    if (!typingUsers.includes(name)) {
      typingUsers.push(name);
    }
    io.emit("typing", typingUsers);
  });

  socket.on("disableTyping", (name) => {
    socket.broadcast.emit("disableTyping", name);
  });
});

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  // log if the server is running
});
