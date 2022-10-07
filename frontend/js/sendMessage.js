import { withContext } from "./Context.js";

/**
 * Sends message to the server.
 * @param {SubmitEvent} event Event object
 * @param {SocketIOClient.Socket} socket Socket object
 */
function sendMessage({ messageInput, socket }, event) {
  event.preventDefault();

  const message = messageInput.value;
  messageInput.value = "";

  socket.emit("message", message);
}

export default withContext(sendMessage);
