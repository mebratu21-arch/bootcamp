const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const users = {}; // store users by socket.id
const rooms = {}; // store active users per room

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // User joins a room
  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    users[socket.id] = { username, room };

    if (!rooms[room]) rooms[room] = [];
    rooms[room].push(username);

    // Notify room of new user
    socket.to(room).emit('message', { user: 'system', text: `${username} has joined the room.` });

    // Update active users
    io.to(room).emit('activeUsers', rooms[room]);
  });

  // Listen for chat messages
  socket.on('chatMessage', (msg) => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit('message', { user: user.username, text: msg });
    }
  });

  // User disconnects
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      const { username, room } = user;
      rooms[room] = rooms[room].filter(u => u !== username);
      socket.to(room).emit('message', { user: 'system', text: `${username} has left the room.` });
      io.to(room).emit('activeUsers', rooms[room]);
      delete users[socket.id];
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
