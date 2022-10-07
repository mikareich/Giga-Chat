import { withContext } from "./Context.js";
import formatTimestamp from "./formatTimestamp.js";
/**
 * Displays a message in the messages container.
 * @param message Message to be displayed
 */
function addMessage({ messagesContainer, user }, message) {
  // messageTimeStamps.push(message.timestamp);

  console.log(message, user);

  const isSelf = message.author.id === user.id;
  const isServer = message.author === "server";

  let displayedUsername = message.author.name;
  if (isServer) displayedUsername = "Server";
  if (isSelf) displayedUsername = "You";

  const container = document.createElement("li");
  container.className = "messages-container__message";

  if (isSelf) container.classList.add("messages-container__message-self");
  if (isServer) container.classList.add("messages-container__message-server");

  container.innerHTML = `
  <div class="messages-container__message-content">${message.content}</div>
  <div class="messages-container__message-meta">
    <span class="messages-container__message-author">${displayedUsername}</span>
    <span
      class="messages-container__message-time"
      >${formatTimestamp(message.timestamp)}</span
    >
  </div>`;

  messagesContainer.appendChild(container);
}

export default withContext(addMessage);
