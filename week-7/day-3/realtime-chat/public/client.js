const socket = io();

// Parse username and room from query string
const params = new URLSearchParams(window.location.search);
const username = params.get("username") || "Anonymous";
const room = params.get("room") || "general";

document.getElementById("room-name").innerText = room;

// Join room
socket.emit("joinRoom", { username, room });

// Receive messages
socket.on("message", (msg) => {
  addMessage(msg);
  playNotification();
});

// Receive user list
socket.on("roomUsers", (users) => {
  const usersList = document.getElementById("users");
  usersList.innerHTML = "";
  users.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = u;
    usersList.appendChild(li);
  });
});

// Send message
document.getElementById("chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("msg");
  const text = input.value.trim();
  if (!text) return;
  socket.emit("chatMessage", text);
  input.value = "";
  input.focus();
});

function addMessage(msg) {
  const messagesDiv = document.getElementById("messages");
  const div = document.createElement("div");
  div.classList.add("message");
  if (msg.system) div.classList.add("system");

  const meta = document.createElement("div");
  meta.classList.add("meta");
  meta.textContent = msg.username;

  const text = document.createElement("div");
  text.textContent = msg.text;

  div.appendChild(meta);
  div.appendChild(text);
  messagesDiv.appendChild(div);

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function playNotification() {
  const audio = document.getElementById("notif-sound");
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
}
