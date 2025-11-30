DRUMSET MINI PROJECT
--------------------

Description:
This is a simple Drumset created with HTML, CSS, and JavaScript.
Users can play drum sounds by pressing keyboard keys or clicking
the drum buttons on the screen.

--------------------------------------------------------------
HOW IT WORKS
--------------------------------------------------------------

1. HTML Structure
-----------------
- Each drum pad is a <div> with a data-key attribute.
  Example: <div class="drum" data-key="65">A</div>

- Each audio file also has a matching data-key.
  Example: <audio data-key="65" src="sounds/kick.wav"></audio>

- The number in data-key represents a keyboard keyCode.
  Example: "A" key on your keyboard = keyCode 65.

2. CSS Styling
--------------
- Buttons are styled to look like drum pads.
- When a sound is played, a CSS class "active" is added temporarily
  to create a visual animation (highlight + scale).

3. JavaScript Logic
-------------------
A. Detect Keyboard Press:
   - JavaScript listens for "keydown" event.
   - The keyCode of the pressed key is checked.
   - If a matching audio element exists, the sound is played.

B. Detect Mouse Click:
   - When a drum button is clicked, its data-key value
     is used to find and play the correct sound.

C. Play Sound Function:
   - Finds the <audio> element with matching data-key.
   - Rewinds audio to start so repeated taps work.
   - Plays the sound.
   - Adds "active" class to animate the button.

4. Sound Files
--------------
Place all sound files inside a folder named "sounds".
Example file names:
- kick.wav
- snare.wav
- hihat.wav
- tom1.wav
- tom2.wav
- crash.wav
- ride.wav
- clap.wav

The project will not work if the folder or file names
are incorrect.

--------------------------------------------------------------
HOW TO USE
--------------------------------------------------------------

1. Open index.html in any browser.
2. Press keys on your keyboard (A, S, D, F, G, H, J, K).
3. OR click the drum buttons with your mouse.
4. Sounds will play immediately.

--------------------------------------------------------------
FILES INCLUDED
--------------------------------------------------------------

index.html
style.css
script.js
sounds/ (folder with .wav files)
README.txt

--------------------------------------------------------------
END
--------------------------------------------------------------
