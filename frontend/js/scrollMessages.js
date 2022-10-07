import { withContext } from "./Context.js";

// scrolls to the bottom of the messages container when a new message is added
function scrollMessages({ messagesContainer }) {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export default withContext(scrollMessages);
