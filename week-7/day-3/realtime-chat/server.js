const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {}; // socket.id -> { username, room }

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  socket.on("joinRoom", ({ username, room }) => {
    users[socket.id] = { username, room };
    socket.join(room);

    // Welcome current user
    socket.emit("message", {
      username: "System",
      text: `Welcome to room: ${room}`,
      system: true
    });

    // Broadcast that user joined
    socket.to(room).emit("message", {
      username: "System",
      text: `${username} has joined the chat`,
      system: true
    });

    // Send updated user list
    sendRoomUsers(room);
  });

  socket.on("chatMessage", (text) => {
    const user = users[socket.id];
    if (!user) return;
    io.to(user.room).emit("message", {
      username: user.username,
      text,
      system: false
    });
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      const { username, room } = user;
      delete users[socket.id];

      io.to(room).emit("message", {
        username: "System",
        text: `${username} has left the chat`,
        system: true
      });

      sendRoomUsers(room);
    }
  });

  function sendRoomUsers(room) {
    const roomUsers = Object.values(users)
      .filter((u) => u.room === room)
      .map((u) => u.username);

    io.to(room).emit("roomUsers", roomUsers);
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
