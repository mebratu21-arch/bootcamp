// =========================================================================
// ⏱️ Exercise 1: Timer (setTimeout & setInterval)
// =========================================================================
(function() {
    console.log("--- Executing Exercise 1: Timer JS ---");
    const container = document.getElementById('container');
    const clearButton = document.getElementById('clear');

    if (!container || !clearButton) {
        console.log("Exercise 1 elements not found. Skipping.");
        return;
    }

    // Part I: setTimeout (Alert)
    setTimeout(() => {
        // alert("Hello World (Part I)");
        console.log("Part I executed: Alert 'Hello World' was called after 2 seconds.");
    }, 2000);

    // Part II: setTimeout (Paragraph)
    setTimeout(() => {
        const p2 = document.createElement('p');
        p2.textContent = "Hello World (Part II)";
        container.appendChild(p2);
        console.log("Part II executed: Paragraph added after 2 seconds.");
    }, 2000);

    // Part III: setInterval (Paragraph and Clear)
    let paragraphCount = 0;

    const intervalId = setInterval(() => {
        // Add a new paragraph
        const p3 = document.createElement('p');
        p3.textContent = `Hello World (Part III - Count: ${paragraphCount + 1})`;
        container.appendChild(p3);
        paragraphCount++;

        // Clear the interval when there are 5 paragraphs
        if (paragraphCount >= 5) {
            clearInterval(intervalId);
            console.log("Part III cleared: Reached 5 paragraphs.");
        }
    }, 2000);

    // Clear the interval when the button is clicked (also works as a manual override)
    clearButton.addEventListener('click', () => {
        clearInterval(intervalId);
        console.log("Part III cleared: Button clicked.");
        alert("The interval has been manually cleared!");
    });
})();


// =========================================================================
// 📦 Exercise 2: Move the box (myMove function)
// NOTE: This function must be globally accessible because it's called 
// directly from the HTML 'onclick' attribute.
// =========================================================================
let animationInterval;

window.myMove = function() {
    console.log("\n--- Executing Exercise 2: Move the box JS ---");
    const animateDiv = document.getElementById('animate');
    const containerDiv = document.getElementById('container');
    
    if (!animateDiv || !containerDiv) {
        console.log("Exercise 2 elements not found. Skipping move.");
        return;
    }

    // Safety check: clear any existing interval before starting a new one
    clearInterval(animationInterval);
    
    let pos = 0;
    // Calculate the maximum left position: Container width (400px) - Box width (50px) = 350px
    const endPosition = containerDiv.offsetWidth - animateDiv.offsetWidth;

    // Set initial position to 0 to ensure restart works correctly
    animateDiv.style.left = '0px';

    // Use setInterval to move the box 1px every 1ms
    animationInterval = setInterval(frame, 1); 

    function frame() {
        if (pos >= endPosition) {
            // Clear the interval when the box reaches the end
            clearInterval(animationInterval); 
            console.log("Animation complete: Box reached the right edge.");
        } else {
            // Move the box 1px to the right
            pos++; 
            animateDiv.style.left = pos + 'px';
        }
    }
}