// =========================================================================
// 🌟 Exercise 1: Change the article
// =========================================================================
(function() {
    console.log("--- Executing Exercise 1 JS ---");
    const article = document.getElementById('article-section');
    if (!article) return; // Exit if the article isn't found

    // 1. Retrieve the h1 and console.log it using a DOM property
    const h1Element = article.firstElementChild; 
    console.log('1. h1 Element (DOM Property):', h1Element);

    // 2. Remove the last paragraph
    const paragraphs = article.getElementsByTagName('p');
    if (paragraphs.length > 0) {
        const lastParagraph = paragraphs[paragraphs.length - 1];
        article.removeChild(lastParagraph);
        console.log('2. Last paragraph removed.');
    }

    // 3. Change h2 background to red on click
    const h2Element = article.querySelector('h2');
    if (h2Element) {
        h2Element.addEventListener('click', function() {
            h2Element.style.backgroundColor = 'red';
        });
    }

    // 4. Hide h3 on click
    const h3Element = article.querySelector('h3');
    if (h3Element) {
        h3Element.addEventListener('click', function() {
            h3Element.style.display = 'none';
        });
    }

    // 5. Make all paragraph text bold on button click
    const boldButton = document.getElementById('bold-btn');
    if (boldButton) {
        boldButton.addEventListener('click', function() {
            const currentParagraphs = article.getElementsByTagName('p');
            for (let p of currentParagraphs) {
                p.style.fontWeight = 'bold';
            }
        });
    }

    // 🌟 BONUS 1: h1 font size random on hover
    if (h1Element) {
        h1Element.addEventListener('mouseover', function() {
            const randomSize = Math.floor(Math.random() * 101); // 0 to 100
            h1Element.style.fontSize = `${randomSize}px`;
        });
    }

    // 🌟 BONUS 2: 2nd paragraph fades out on hover
    const secondParagraph = article.querySelector('.paragraph-2'); 
    if (secondParagraph) {
        secondParagraph.addEventListener('mouseover', function() {
            secondParagraph.classList.add('fade-out');
        });
    }
})();

// =========================================================================
// 🌟 Exercise 2: Work with forms
// =========================================================================
(function() {
    console.log("\n--- Executing Exercise 2 JS ---");
    const form = document.getElementById('myForm');
    const firstNameInput = document.getElementById('fname');
    const lastNameInput = document.getElementById('lname');
    const usersAnswerList = document.querySelector('.usersAnswer');

    if (!form) return;

    // Retrieve and log elements
    console.log('1. Form Element (by ID):', form);
    console.log('2a. First Name Input (by ID):', firstNameInput);
    console.log('3b. Last Name Input (by name):', document.getElementsByName('lastname')[0]);

    // Submission handler
    form.addEventListener('submit', function(event) {
        // event.preventDefault() stops the page from reloading.
        event.preventDefault(); 
        
        const fnameValue = firstNameInput.value.trim();
        const lnameValue = lastNameInput.value.trim();

        if (fnameValue !== '' && lnameValue !== '') {
            usersAnswerList.innerHTML = ''; // Clear previous list items

            const liFName = document.createElement('li');
            liFName.textContent = fnameValue;

            const liLName = document.createElement('li');
            liLName.textContent = lnameValue;

            usersAnswerList.appendChild(liFName);
            usersAnswerList.appendChild(liLName);

            form.reset();
        } else {
            alert('Please fill out both the first name and last name fields.');
        }
    });
})();


// =========================================================================
// 🌟 Exercise 3: Transform the sentence
// =========================================================================
(function() {
    console.log("\n--- Executing Exercise 3 JS ---");
    let allBoldItems;
    const paragraphElement = document.getElementById('myParagraph');

    if (!paragraphElement) return;

    function getBoldItems() {
        allBoldItems = paragraphElement.querySelectorAll('strong');
    }

    function highlight() {
        if (!allBoldItems) getBoldItems(); 
        allBoldItems.forEach(item => {
            item.style.color = 'blue';
        });
    }

    function returnItemsToDefault() {
        if (!allBoldItems) getBoldItems(); 
        allBoldItems.forEach(item => {
            item.style.color = 'black';
        });
    }

    // Call the functions on mouse events
    paragraphElement.addEventListener('mouseover', highlight);
    paragraphElement.addEventListener('mouseout', returnItemsToDefault);
    
    // Initial population
    getBoldItems(); 
})();


// =========================================================================
// 🌟 Exercice 4: Volume of a sphere
// =========================================================================
(function() {
    console.log("\n--- Executing Exercise 4 JS ---");
    const form = document.getElementById('MyForm');
    const radiusInput = document.getElementById('radius');
    const volumeInput = document.getElementById('volume');

    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const radius = parseFloat(radiusInput.value);

        if (isNaN(radius) || radius <= 0) {
            alert('Please enter a valid positive number for the radius.');
            volumeInput.value = '';
            return;
        }

        // Volume of a sphere: V = (4/3) * π * r³
        const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);

        // Display result, rounded to 4 decimal places
        volumeInput.value = volume.toFixed(4); 
    });
})();