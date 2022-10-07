const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const User = require("./User");
const { Message, ServerMessage } = require("./Message");

// create a express server
const app = express();
const server = http.createServer(app);

// create socket-io server
const io = new Server(server);
const port = process.env.PORT || 3000;

// app use express.static to serve static files
app.use(express.static("frontend"));

// init users array
const users = [];

const getTypingUsers = () => users.filter((user) => user.isTyping);

io.use(function (socket, next) {
  next();
});

io.on("connection", (socket) => {
  const { name } = socket.handshake.query;
  const { id } = socket;
  const userExists = users.find((user) => user.name === name);
  console.log(name + " connected");

  // if user exists, disconnect
  if (userExists || name === "undefined") {
    socket.emit("loginFail", "User already exists");
    socket.disconnect();

    return;
  }

  // create new user
  const user = new User(name, id);
  users.push(user);
  socket.emit("userLoggedIn", user);

  // send message to client
  socket.broadcast.emit(
    "message",
    new ServerMessage(`User ${user.name} joined the chat`)
  );

  // user typing
  socket.on("typing", () => {
    user.isTyping = true;
    socket.broadcast.emit("typing", getTypingUsers());
  });

  // user stop typing
  socket.on("stopTyping", () => {
    user.isTyping = false;
    socket.broadcast.emit("typing", getTypingUsers());
  });

  // send message to clients
  socket.on("message", (messageContent) => {
    if(messageContent.trim() === "") {
      socket.emit("messageFail", "Message cannot be empty");
      return;
    }
    console.log("message: " + messageContent);

    const message = new Message(messageContent, user);
    console.log(message);

    io.emit("message", message);
    user.isTyping = false;
    socket.broadcast.emit("typing", getTypingUsers());
  });

  // disconnect
  socket.on("disconnect", () => {
    // remove user from users array
    const userIndex = users.findIndex((user) => user.socketID === id);
    users.splice(userIndex, 1);

    socket.broadcast.emit(
      "message",
      new ServerMessage(`User ${name} left the chat`)
    );
  });
});

// listen on port
server.listen(port, () => {
  console.log(`listening on :${port}`);
});
