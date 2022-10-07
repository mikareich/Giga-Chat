import { withContext } from "./Context.js";

let typingTimeout = null;

export const sendTypingEvent = withContext(({ socket }) => {
  socket.emit("typing");

  if (typingTimeout) clearTimeout(typingTimeout);

  typingTimeout = setTimeout(() => {
    socket.emit("stopTyping");
  }, 1000 * 30);
});

export const displayTypingUsers = withContext(({ typingIndicator }, users) => {
  if (users.length === 0) return (typingIndicator.innerHTML = "");

  const lastUserTyping = users.pop();

  typingIndicator.innerHTML = `${lastUserTyping.name} is typing...`;
});
