// ------------------------------
// PLAY SOUND FUNCTION
// ------------------------------
function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.drum[data-key="${keyCode}"]`);

  if (!audio) return; // prevent errors for wrong keys

  audio.currentTime = 0; // rewind to start so rapid taps work
  audio.play();          // play sound

  // add animation
  key.classList.add("active");
  setTimeout(() => key.classList.remove("active"), 150);
}

// ------------------------------
// KEYBOARD EVENT
// ------------------------------
document.addEventListener("keydown", function (event) {
  playSound(event.keyCode);
});

// ------------------------------
// MOUSE CLICK EVENT
// ------------------------------
const drums = document.querySelectorAll(".drum");

drums.forEach((drum) => {
  drum.addEventListener("click", function () {
    const key = this.getAttribute("data-key");
    playSound(key);
  });
});
