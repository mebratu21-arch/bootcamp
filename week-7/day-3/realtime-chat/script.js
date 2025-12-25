const socket = io();

const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const joinBtn = document.getElementById('joinBtn');
const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room');
const messageForm = document.getElementById('messageForm');
const msgInput = document.getElementById('msg');
const messages = document.getElementById('messages');
const usersList = document.getElementById('users');

let username, room;

joinBtn.addEventListener('click', () => {
  username = usernameInput.value.trim();
  room = roomInput.value.trim();

  if(username && room){
    socket.emit('joinRoom', { username, room });
    loginContainer.style.display = 'none';
    chatContainer.style.display = 'flex';
  }
});

socket.on('message', (msg) => {
  const div = document.createElement('div');
  div.textContent = `${msg.user}: ${msg.text}`;
  div.classList.add(msg.user === 'system' ? 'system-msg' : 'user-msg');
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

socket.on('activeUsers', (users) => {
  usersList.innerHTML = '';
  users.forEach(u => {
    const li = document.createElement('li');
    li.textContent = u;
    usersList.appendChild(li);
  });
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = msgInput.value;
  if(msg){
    socket.emit('chatMessage', msg);
    msgInput.value = '';
    msgInput.focus();
  }
});
