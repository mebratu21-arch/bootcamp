import { initializeApp, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, onSnapshot, collection, query, limit, orderBy } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// setLogLevel('Debug'); // Uncomment for debugging Firestore

// --- GLOBAL SETUP & FIREBASE VARIABLES ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-whackamole-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

let db, auth; // Firebase instances
let currentUserId = null;
let currentAppId = appId;
let isAuthReady = false;


// --- GAME STATE VARIABLES ---
const GAME_DURATION = 30; // seconds
const HIGH_SCORE_LIMIT = 5;
const MOLE_EMOJI = '🐭'; // Using a mouse/hamster emoji for the mole
const MOLE_WHACKED_EMOJI = '💥';

let score = 0;
let timeLeft = GAME_DURATION;
let gameTimer;
let popTimer;
let gameActive = false;
let lastHole = null;
let highScores = [];

// --- DOM ELEMENTS ---
const scoreDisplay = document.getElementById('score-display');
const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const gameGrid = document.getElementById('game-grid');
const feedbackMessage = document.getElementById('feedback-message');
const modalOverlay = document.getElementById('game-over-modal');
const finalScoreText = document.getElementById('final-score-text');
const nameInputArea = document.getElementById('name-input-area');
const playerNameInput = document.getElementById('player-name-input');
const submitScoreButton = document.getElementById('submit-score-button');
const modalCloseButton = document.getElementById('modal-close-button');
const highScoreDisplay = document.getElementById('high-score-display');
const modalHighScoreList = document.getElementById('modal-high-score-list');
const modalTitle = document.getElementById('modal-title');


// --- UTILITY FUNCTIONS ---

/**
 * Generates a random time duration between min and max (in ms).
 * @param {number} min - Minimum wait time in ms.
 * @param {number} max - Maximum wait time in ms.
 * @returns {number} Random wait time in ms.
 */
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * Gets a random hole that is not the last hole the mole popped up in.
 * @param {NodeList} holes - Array of hole elements.
 * @returns {HTMLElement} A random hole element.
 */
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        // Recursively call until a different hole is found
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

/**
 * Renders the high score list into a specific UL element.
 * @param {HTMLElement} listElement - The UL element to render into.
 */
function renderHighScores(listElement) {
    listElement.innerHTML = highScores.map((scoreEntry, index) => 
        `<li class="${index < 3 ? 'font-extrabold' : 'font-semibold'}">
            <span>${index + 1}. ${scoreEntry.name}</span>
            <span>${scoreEntry.score}</span>
        </li>`
    ).join('');

    if (highScores.length === 0) {
         listElement.innerHTML = `<li>No scores yet!</li>`;
    }
}

/**
 * Renders the game grid (the 9 holes).
 */
function renderGrid() {
    gameGrid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.classList.add('hole');
        hole.dataset.id = i;
        hole.innerHTML = `
            <div class="mole-hill">
                <span class="mole">${MOLE_EMOJI}</span>
            </div>
        `;
        // Use event delegation or listener on the specific element the mole occupies
        hole.addEventListener('click', whack); 
        gameGrid.appendChild(hole);
    }
}


// --- GAME LOGIC ---

/**
 * Main function to make a mole pop up.
 */
function peep() {
    if (!gameActive) return;

    const holes = document.querySelectorAll('.hole');
    if (holes.length === 0) return;

    const time = randomTime(500, 1500); // Time mole is visible
    const hole = randomHole(holes);
    
    hole.querySelector('.mole-hill').classList.add('up');
    
    // Set timeout for the mole to go down
    setTimeout(() => {
        hole.querySelector('.mole-hill').classList.remove('up');
    }, time);

    // If the game is still active, call peep again after the duration
    const nextPeepTime = randomTime(1000, 2000); // Time until next mole appears
    popTimer = setTimeout(peep, nextPeepTime);
}

/**
 * Starts the game timer and mole popping sequence.
 */
function startGame() {
    if (gameActive) return;

    score = 0;
    timeLeft = GAME_DURATION;
    gameActive = true;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = `${timeLeft}s`;
    startButton.disabled = true;
    feedbackMessage.classList.add('hidden');
    
    // Ensure all moles are down and clear any running timers
    clearTimeout(popTimer);
    clearInterval(gameTimer);
    document.querySelectorAll('.mole-hill').forEach(hill => hill.classList.remove('up'));

    peep(); // Start the mole popping sequence
    
    // Start the main game timer
    gameTimer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = `${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            clearTimeout(popTimer);
            endGame();
        }
    }, 1000);
}

/**
 * Handles the player clicking on a hole.
 * @param {Event} e - The click event.
 */
function whack(e) {
    // Check if the click occurred on a mole that is up
    const moleHill = e.currentTarget.querySelector('.mole-hill');
    if (!gameActive || !moleHill.classList.contains('up')) return;

    // Mole was whacked!
    score++;
    scoreDisplay.textContent = score;

    const mole = moleHill.querySelector('.mole');
    
    // Visual feedback: briefly show explosion/hit, then put mole down
    mole.textContent = MOLE_WHACKED_EMOJI;
    mole.classList.add('whacked');
    
    moleHill.classList.remove('up');

    // Reset mole graphic after a short delay
    setTimeout(() => {
        mole.classList.remove('whacked');
        mole.textContent = MOLE_EMOJI;
    }, 300);
}

/**
 * Ends the game and displays the final score/modal.
 */
function endGame() {
    gameActive = false;
    clearInterval(gameTimer);
    clearTimeout(popTimer);
    startButton.disabled = false;

    // 1. Prepare Modal content
    finalScoreText.textContent = `Your final score: ${score}`;
    nameInputArea.classList.add('hidden'); // Hide input by default
    
    // 2. Check for High Score
    const isHighScore = highScores.length < HIGH_SCORE_LIMIT || score > highScores[highScores.length - 1].score;

    if (isHighScore) {
        modalTitle.textContent = "NEW HIGH SCORE!";
        nameInputArea.classList.remove('hidden');
        playerNameInput.value = '';
        submitScoreButton.disabled = false;
        playerNameInput.focus();
    } else {
        modalTitle.textContent = "GAME OVER!";
        nameInputArea.classList.add('hidden');
    }

    // 3. Display High Scores in the modal and show modal
    renderHighScores(modalHighScoreList);
    modalOverlay.style.display = 'flex';
}

/**
 * Submits the new high score to Firestore.
 */
async function submitHighScore() {
    const name = playerNameInput.value.trim() || 'Anonymous';
    if (name.length > 15) {
        console.error('Name too long. Max 15 characters.');
        // Use custom modal message instead of alert
        modalTitle.textContent = "Name too long!";
        return;
    }

    submitScoreButton.disabled = true;
    
    const newScoreEntry = {
        name: name,
        score: score,
        timestamp: Date.now(),
        userId: currentUserId,
        appId: currentAppId 
    };

    if (!db) {
        console.error("Firestore is not initialized. Cannot save score.");
        modalTitle.textContent = "Error: Database not ready.";
        submitScoreButton.disabled = false;
        return;
    }

    const scoresCollectionRef = collection(db, `artifacts/${currentAppId}/public/data/highscores`);

    try {
         // Create a new document with an auto-generated ID
         await setDoc(doc(scoresCollectionRef), newScoreEntry);
         
         // Hide input area and show success message
         modalTitle.textContent = "Score Submitted!";
         nameInputArea.classList.add('hidden');
         
    } catch (error) {
        console.error("Error writing document: ", error);
        modalTitle.textContent = "Failed to save score.";
        submitScoreButton.disabled = false;
    } finally {
        // Close modal after a short delay
        setTimeout(() => {
            modalOverlay.style.display = 'none';
        }, 1000);
    }
}


// --- FIREBASE LISTENERS ---

/**
 * Sets up the real-time listener for high scores.
 */
function setupFirestoreListener() {
    if (!db) return; // Skip if no Firebase instance (e.g., local fallback)

    // Collection path: /artifacts/{appId}/public/data/highscores
    const scoresCollectionRef = collection(db, `artifacts/${currentAppId}/public/data/highscores`);

    // Order by score descending, limit to top 5
    const q = query(scoresCollectionRef, orderBy('score', 'desc'), limit(HIGH_SCORE_LIMIT));
    
    onSnapshot(q, (snapshot) => {
        highScores = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            highScores.push({ id: doc.id, name: data.name, score: data.score, timestamp: data.timestamp });
        });

        // Update the main high score display
        renderHighScores(highScoreDisplay);

        // If modal is open, update its list too
        if (modalOverlay.style.display === 'flex') {
            renderHighScores(modalHighScoreList);
        }
    }, (error) => {
        console.error("Error listening to high scores:", error);
        feedbackMessage.textContent = "Error loading high scores.";
        feedbackMessage.classList.remove('hidden');
    });
}


// --- INITIALIZATION ---

/**
 * Entry point after Firebase Auth has initialized or failed/skipped.
 */
function initGame() {
    // Final check for variable assignments
    currentAppId = appId;

    renderGrid();
    renderHighScores(highScoreDisplay); // Initial render with empty array

    startButton.addEventListener('click', startGame);
    modalCloseButton.addEventListener('click', () => modalOverlay.style.display = 'none');
    submitScoreButton.addEventListener('click', submitHighScore);

    if (isAuthReady && db) {
        setupFirestoreListener();
    } else if (isAuthReady) {
         feedbackMessage.textContent = "Game loaded, but high scores are local (Firebase config missing).";
         feedbackMessage.classList.remove('hidden');
    }
}

// --- FIREBASE APP AND AUTH SETUP ---
if (Object.keys(firebaseConfig).length > 0) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    // Authentication Setup
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUserId = user.uid;
        } else {
            // Sign in anonymously if no token is available or user is signed out
            try {
                await signInAnonymously(auth);
                currentUserId = auth.currentUser.uid;
            } catch (error) {
                console.error("Anonymous sign-in failed:", error);
                currentUserId = crypto.randomUUID(); // Fallback ID
            }
        }
        isAuthReady = true;
        initGame(); // Call initGame once authenticated
    });

    // Use custom token if provided (Canvas environment)
    if (initialAuthToken) {
        signInWithCustomToken(auth, initialAuthToken).catch(error => {
            console.error("Custom token sign-in failed:", error);
        });
    } else {
        // Initial check for onAuthStateChanged will handle sign-in
    }
} else {
    // Non-Firebase fallback (for local testing without Canvas environment variables)
    isAuthReady = true;
    currentUserId = crypto.randomUUID();
    initGame();
}