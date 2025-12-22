#  Real‑Time Chat Application  
Built with **Express**, **Socket.io**, and **HTML/CSS**

A simple real‑time chat application where users can join chat rooms, choose a username, send messages, and see updates instantly. This project demonstrates real‑time communication using WebSockets and a clean, responsive frontend.

---

##  Features

### Core Functionality
- Real‑time messaging using Socket.io  
- Join custom chat rooms  
- Choose a username before entering  
- Active users list per room  
- System notifications for join/leave events  
- Clean, responsive UI  
- Message notifications  

### Optional Enhancements (not included but easy to add)
- Private messaging  
- Profile pictures  
- Emojis & media support  
- Multiple chat themes  
- Chat history saved in a database  
- User authentication  

---

##  Project Structure

```
realtime-chat/
│   package.json
│   server.js
│
└── public/
    │   index.html
    │   chat.html
    │   style.css
    │   client.js
```

---

##  Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd realtime-chat
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server
```bash
npm start
```

### 4. Open the app
```
http://localhost:3000
```

---

##  How It Works

### Backend (Express + Socket.io)
- Express serves static frontend files  
- Socket.io manages:
  - User connections  
  - Room joining  
  - Broadcasting messages  
  - Updating active user lists  

### Frontend
- `index.html` → username + room selection  
- `chat.html` → main chat interface  
- `client.js` → handles socket events and UI updates  

---

##  Real‑Time Events

### Client → Server
- `joinRoom` — user joins a room  
- `chatMessage` — user sends a message  

### Server → Client
- `message` — new message received  
- `roomUsers` — updated active user list  

---

##  Testing

Open multiple browser tabs and join the same room with different usernames to simulate multiple users.

---

##  Future Enhancements

- Authentication (JWT, OAuth)  
- Profile pictures  
- Chat history (MongoDB / PostgreSQL)  
- Dark mode / themes  
- Mobile‑optimized UI  
- Browser notifications  

---



This project is free to use for learning and development.

