💥 Whack-a-Mole Game 🐭

A classic Whack-a-Mole game built using vanilla HTML, CSS, and JavaScript, featuring real-time, persistent high scores powered by Google's Firebase Firestore database.

🚀 Key Features

Classic Gameplay: Simple and fast-paced mole-whacking action.

Responsive Design: Optimized for play on both mobile and desktop devices.

Persistent High Scores: Top 5 scores are stored and displayed in real-time using Firestore, allowing users across different sessions and devices to compete.

Firebase Authentication: Uses anonymous sign-in to securely track and submit scores without requiring user registration.

🛠️ Technology Stack

HTML5: Structure of the game and UI.

CSS3 (style.css): Custom styling using a "retro arcade" aesthetic (Bungee Spice and Press Start 2P fonts).

JavaScript (script.js): Game logic, DOM manipulation, and Firebase integration.

Firebase Firestore: Real-time, public database used to store and manage the global high score list.

Firebase Auth: Used for anonymous authentication.

📁 File Structure

The project is organized into three files:

index.html: The main structure, linking the CSS and the JavaScript module.

style.css: All custom styling, including the grid, mole animations, and modal appearance.

script.js: The core game loop, event listeners, and all logic for Firebase initialization, authentication, high score fetching, and submission.

🎮 How to Play

Click the "Start Game" button to begin the 30-second countdown.

Moles will randomly pop up from the 9 holes.

Click (whack) the mole as quickly as possible while it is visible to score 1 point.

Once the time runs out, the game ends.

If your score is high enough to make the Top 5 list, you will be prompted to enter your name to submit your new high score.

💾 High Score Mechanism (Firebase)

The application uses Firestore to manage high scores in the following public collection path:

/artifacts/{appId}/public/data/highscores


Reading Scores: The setupFirestoreListener function in script.js creates an onSnapshot query, which listens for real-time changes, orders scores by score in descending order, and limits the results to the top 5 (HIGH_SCORE_LIMIT).

Submitting Scores: The submitHighScore function checks if the player's score qualifies as a high score and, if so, saves a new document to the collection.