# TODO

- [x] CSS moves down when new message
- [x] Login box / page

## Server events

### User connects with a name

User is added to users array, if name is not taken
User is sent a successfulConnection event to get to chat
Other users are sent a userUpdate event with the new user and an eventMessage event with the new user joining

### User is typing

User sends a userTyping event that actualizes the typing status of the user
Other users are sent a userUpdate event with the new user typing status

### User sends a message

Message is sent to all users with a message event

### User disconnects

User is removed from users array
Other users are sent a userUpdate event with the disconnected user and an eventMessage event with the disconnected user leaving
