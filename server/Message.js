const { v4: id } = require("uuid");

class Message {
  constructor(content, author) {
    this.content = content;
    this.author = author;
    this.timestamp = Date.now();
    this.id = id();
  }
}

class ServerMessage extends Message {
  constructor(content) {
    super(content, "server");
  }
}

module.exports = { Message, ServerMessage };
