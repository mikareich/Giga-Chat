import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import User from './User';

// create a express server
const app = express();
const server = http.createServer(app);

// create socket-io server
const io = new Server(server);
const port = process.env.PORT || 3000;

// app use express.static to serve static files
app.use(express.static('public'));

// init users array
const users: User[] = [];

io.on('connection', (socket) => {
  // login attempt
  socket.on('login', ({ name, socketID }) => {        // check if user exists
        const userExists = users.find(user => user.name === name)
        if (userExists) {
            // if user exists, send error
            socket.to(socketID).emit('loginError', 'User already exists');
        } else {
            // if user does not exist, create new user
            const user = new User(name, socketID);
            users.push(user);
            // send user list to all users
            io.emit('updateUsers', users);
        }});

    // disconnect
    socket.on('disconnect', (socketID) => {
        // find user by socketID
    }))
});

// listen on port
server.listen(port, () => {
  console.log(`listening on :${port}`)
});
