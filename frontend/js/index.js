import addMessage from "./addMessage.js";
import sendMessage from "./sendMessage.js";
import formatTimestamp from "./formatTimestamp.js";
import scrollMessages from "./scrollMessages.js";
import Context from "./Context.js";
import { displayTypingUsers, sendTypingEvent } from "./typingHandler.js";
import updateMessageTime from "./updateMessageTime.js";
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messagesContainer = document.getElementById("messages-container");
const typingIndicator = document.getElementById("typing-indicator");

const messageTimeStamps = [];

const username = Math.random().toString(36).substring(7);
const socket = io(window.location.origin, {
  query: `name=${username}`,
});

socket.on("connect", () => {
  socket.on("userLoggedIn", (user) => {
    console.log(user);
    context.addToContext("user", user);
  });

  messageForm.addEventListener("submit", (event) => sendMessage(event));
  messageInput.addEventListener("input", sendTypingEvent);

  socket.on("message", (msg) => {
    addMessage(msg);
    scrollMessages();
  });
  socket.on("typing", displayTypingUsers);
});

// initialize context
const context = new Context({
  socket,
  messageForm,
  messageInput,
  messagesContainer,
  typingIndicator,
});

// updates the time of the message every second
setInterval(() => {
  updateMessageTime(messageTimeStamps);
}, 1000);
