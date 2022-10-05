const ALL_USERNAMES = ["mika", "minh", "marco", "mathis"];
const userName =
  ALL_USERNAMES[Math.round(Math.random() * ALL_USERNAMES.length)];

const socket = io();

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const typingContainer = document.getElementById("typing");
const chatContainer = document.getElementById("messages");

function renderMessage({ user, msg }) {
  const messageContainer = document.createElement("li");
  messageContainer.innerHTML = `<b>[${user}]</b>: ${msg}`;

  chatContainer.appendChild(messageContainer);
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("chat message", { msg: message, user: userName });
  messageInput.value = "";
  socket.emit("disableTyping", userName);
});

messageInput.addEventListener("keydown", () => {
  socket.emit("enableTyping", userName);
});

// listen for chat messages
socket.on("chat message", renderMessage);

// typing indicator
socket.on("enableTyping", (name) => {
  if (!typingNames.includes(name)) {
    typingNames.push(name);
    updateTyping();
  }
});

socket.on("disableTyping", (name) => {
  typingNames.splice(typingNames.indexOf(name), 1);
  updateTyping();
});

socket.on("typing", () => {
  if (typingNames.length > 0) {
    typingContainer.innerHTML = `${typingNames.join(", ")} is typing...`;
  } else {
    typingContainer.innerHTML = "";
  }
});
