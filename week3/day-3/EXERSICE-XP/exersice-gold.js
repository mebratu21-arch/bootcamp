// This file assumes the necessary HTML structure for all three exercises 
// is present in the document.

// =========================================================================
// 🎵 Exercise 1: Select a kind of Music
// =========================================================================
(function() {
    console.log("--- Executing Exercise 1: Music ---");
    const selectElement = document.getElementById('genres');

    if (!selectElement) {
        console.log("Exercise 1 elements not found. Skipping.");
        return;
    }

    // 1. Display the initial selected value
    console.log(`Initial selected value: ${selectElement.value}`);

    // 2. Add an additional option: "Classic"
    const classicOption = document.createElement('option');
    classicOption.value = 'classic';
    classicOption.textContent = 'Classic';

    selectElement.appendChild(classicOption);
    console.log('Added "Classic" option.');

    // 3. Set the newly added option as selected by default
    classicOption.selected = true; 

    // Display the final selected value after modification
    console.log(`Final selected value: ${selectElement.value}`);
})();


// =========================================================================
//  Exercise 2: Delete colors
// =========================================================================
(function() {
    console.log("\n--- Executing Exercise 2: Delete Colors ---");
    
    const select = document.getElementById('colorSelect');
    const removeButton = document.getElementById('removeBtn'); // Assuming an ID was added to the button for easy access

    if (!select || !removeButton) {
        console.log("Exercise 2 elements not found. Skipping.");
        return;
    }

    function removecolor() {
        // Get the index of the currently selected option
        const selectedIndex = select.selectedIndex;

        if (selectedIndex !== -1) {
            // Remove the option element at the selected index
            select.remove(selectedIndex);
            console.log(`Removed option at index ${selectedIndex}`);
        } else {
            console.log('No option selected.');
        }
    }

    // Add click event listener to the button
    removeButton.addEventListener('click', removecolor);
})();


// =========================================================================
// 🛒 Exercise 3: Create a shopping list
// =========================================================================
(function() {
    console.log("\n--- Executing Exercise 3: Shopping List ---");
    
    let shoppingList = [];
    const root = document.getElementById('root');

    if (!root) {
        console.log("Exercise 3 root element not found. Skipping.");
        return;
    }

    // --- DOM Creation ---
    const form = document.createElement('form');
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter item to buy';
    
    const addButton = document.createElement('button');
    addButton.type = 'submit'; 
    addButton.textContent = 'AddItem';

    const listContainer = document.createElement('ul');
    
    const clearButton = document.createElement('button');
    clearButton.textContent = 'ClearAll';
    clearButton.style.marginTop = '10px';

    form.appendChild(inputField);
    form.appendChild(addButton);
    root.appendChild(form);
    root.appendChild(listContainer);
    root.appendChild(clearButton);

    // --- List Management Functions ---
    function renderList() {
        listContainer.innerHTML = ''; 

        if (shoppingList.length === 0) {
            listContainer.textContent = 'Your shopping list is empty.';
            return;
        }
        
        shoppingList.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listContainer.appendChild(listItem);
        });
    }

    function addItem(event) {
        event.preventDefault(); 

        const itemValue = inputField.value.trim();

        if (itemValue) {
            shoppingList.push(itemValue);
            console.log(`Added: ${itemValue}`);
            inputField.value = ''; 
            renderList(); 
        }
    }

    function clearAll() {
        shoppingList = []; // Clear the array
        console.log('List cleared.');
        renderList(); // Update the DOM
    }

    // --- Event Listeners ---
    form.addEventListener('submit', addItem);
    clearButton.addEventListener('click', clearAll);

    // Initial render
    renderList();
})();