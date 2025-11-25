// =========================================================
// 🌟 Exercise 1: Calculate the tip
// =========================================================

// Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";

function calculateTip() {
    // 1. Fetch values
    var billAmount = document.getElementById("billAmt").value;
    var serviceQuality = document.getElementById("serviceQual").value;
    var numberOfPeople = document.getElementById("numOfPeople").value;

    // 2. Validate input (Bill and Service)
    if (billAmount === "" || serviceQuality == 0) {
        alert("Please enter values");
        return;
    }

    // 3. Validate number of people
    // If empty or <= 1, default to 1 and hide the "each" word
    if (numberOfPeople === "" || numberOfPeople <= 1) {
        numberOfPeople = 1;
        document.getElementById("each").style.display = "none";
    } else {
        document.getElementById("each").style.display = "block";
    }

    // 4. Calculate total
    var total = (billAmount * serviceQuality) / numberOfPeople;

    // 5. Round to two decimal points
    total = Math.round(total * 100) / 100;
    total = total.toFixed(2);

    // 6. Display the result
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total;
}

// Call the function when button is clicked
document.getElementById("calculate").onclick = function() {
    calculateTip();
};


// =========================================================
// 🌟 Exercise 2: Validate the email
// =========================================================

const emailForm = document.getElementById('emailForm');
const emailResult = document.getElementById('emailResult');

// Function 1: Validation WITHOUT Regex
function validateEmailNoRegex(email) {
    var atSymbol = email.indexOf("@");
    var dot = email.lastIndexOf(".");

    // Logic: 
    // 1. @ must exist (> -1)
    // 2. . must exist after @ (+ 2 ensures there is a character between @ and .)
    // 3. . must not be the last character (dot + 2 < length)
    if (atSymbol < 1 || dot < atSymbol + 2 || dot + 2 >= email.length) {
        return false;
    }
    return true;
}

// Function 2: Validation WITH Regex (Standard approach)
function validateEmailWithRegex(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Event Listener on Submit
emailForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop form from refreshing page
    
    var emailInput = document.getElementById('userEmail').value;
    
    // You can swap the function call below to test either method
    var isValid = validateEmailNoRegex(emailInput); 
    // var isValid = validateEmailWithRegex(emailInput);

    if (isValid) {
        emailResult.textContent = "Email is Valid!";
        emailResult.className = "message valid";
    } else {
        emailResult.textContent = "Email is Invalid. Please check format.";
        emailResult.className = "message invalid";
    }
});


// =========================================================
// 🌟 Exercise 3: Get the user’s geolocation coordinates
// =========================================================

const geoBtn = document.getElementById("geoBtn");
const geoResult = document.getElementById("geoResult");

function getGeolocation() {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
        geoResult.innerHTML = "Locating...";
        
        navigator.geolocation.getCurrentPosition(
            // Success Callback
            function(position) {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                
                geoResult.innerHTML = `
                    <strong>Latitude:</strong> ${lat} <br>
                    <strong>Longitude:</strong> ${long}
                `;
            },
            // Error Callback
            function(error) {
                geoResult.innerHTML = "Error: " + error.message;
            }
        );
    } else {
        geoResult.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Add click event listener
geoBtn.addEventListener("click", getGeolocation);