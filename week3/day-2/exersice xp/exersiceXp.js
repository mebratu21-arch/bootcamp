// Exercise 1: Numbers Divisible by 23
function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    let numbers = [];
    
    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            numbers.push(i);
            sum += i;
        }
    }
    
    console.log(`Numbers divisible by ${divisor}: ${numbers.join(' ')}`);
    console.log(`Sum: ${sum}`);
    return { numbers, sum };
}

// Test Exercise 1
console.log("=== Exercise 1 ===");
displayNumbersDivisible();
displayNumbersDivisible(3);
displayNumbersDivisible(45);

// Exercise 2: Shopping List
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry": 1
};  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry": 10
};

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
    let total = 0;
    
    for (const item of shoppingList) {
        if (item in stock && stock[item] > 0) {
            total += prices[item];
            stock[item] -= 1; // Bonus: decrease stock by 1
            console.log(`Added ${item} to cart. Price: $${prices[item]}`);
        } else {
            console.log(`${item} is out of stock.`);
        }
    }
    
    return total;
}

// Test Exercise 2
console.log("\n=== Exercise 2 ===");
const totalPrice = myBill();
console.log(`Total price: $${totalPrice}`);
console.log(`Updated stock:`, stock);

// Exercise 3: What's in my Wallet?
function changeEnough(itemPrice, amountOfChange) {
    const [quarters, dimes, nickels, pennies] = amountOfChange;
    const totalChange = quarters * 0.25 + dimes * 0.10 + nickels * 0.05 + pennies * 0.01;
    
    console.log(`Item price: $${itemPrice}`);
    console.log(`Change: ${quarters} quarters, ${dimes} dimes, ${nickels} nickels, ${pennies} pennies`);
    console.log(`Total change: $${totalChange.toFixed(2)}`);
    
    return totalChange >= itemPrice;
}

// Test Exercise 3
console.log("\n=== Exercise 3 ===");
console.log("Test 1:", changeEnough(4.25, [25, 20, 5, 0])); // true
console.log("Test 2:", changeEnough(14.11, [2, 100, 0, 0])); // false
console.log("Test 3:", changeEnough(0.75, [0, 0, 20, 5])); // true

// Exercise 4: Vacation Costs (Bonus Version)
function hotelCost(nights) {
    return nights * 140;
}

function planeRideCost(destination) {
    switch (destination.toLowerCase()) {
        case "london":
            return 183;
        case "paris":
            return 220;
        default:
            return 300;
    }
}

function rentalCarCost(days) {
    let cost = days * 40;
    if (days > 10) {
        cost *= 0.95; // 5% discount
    }
    return cost;
}

function totalVacationCost() {
    // Get user inputs
    let nights, destination, days;
    
    // Get nights with validation
    while (true) {
        nights = prompt("How many nights would you like to stay in the hotel?");
        if (nights && !isNaN(nights) && parseInt(nights) > 0) {
            nights = parseInt(nights);
            break;
        }
        alert("Please enter a valid number of nights.");
    }
    
    // Get destination with validation
    while (true) {
        destination = prompt("What is your destination?");
        if (destination && typeof destination === 'string' && destination.trim() !== '') {
            destination = destination.trim();
            break;
        }
        alert("Please enter a valid destination.");
    }
    
    // Get days with validation
    while (true) {
        days = prompt("For how many days would you like to rent the car?");
        if (days && !isNaN(days) && parseInt(days) > 0) {
            days = parseInt(days);
            break;
        }
        alert("Please enter a valid number of days.");
    }
    
    // Calculate costs
    const hotel = hotelCost(nights);
    const plane = planeRideCost(destination);
    const car = rentalCarCost(days);
    const total = hotel + plane + car;
    
    console.log(`Vacation to ${destination}:`);
    console.log(`- Hotel cost for ${nights} nights: $${hotel}`);
    console.log(`- Plane ticket: $${plane}`);
    console.log(`- Car rental for ${days} days: $${car}`);
    console.log(`Total: $${total}`);
    
    return {
        hotel,
        plane,
        car,
        total,
        nights,
        destination,
        days
    };
}

// Test Exercise 4 (commented out to avoid prompt during testing)
console.log("\n=== Exercise 4 ===");
// Uncomment the line below to test with user input
// totalVacationCost();

// Exercise 5: Users
function manipulateUsers() {
    // Retrieve the div and console.log it
    const container = document.getElementById('container');
    console.log("Container div:", container);
    
    // Change the name "Pete" to "Richard"
    const lists = document.querySelectorAll('.list');
    if (lists.length > 0) {
        lists[0].children[1].textContent = 'Richard';
    }
    
    // Delete the second <li> of the second <ul>
    if (lists.length > 1 && lists[1].children.length > 1) {
        lists[1].removeChild(lists[1].children[1]);
    }
    
    // Change the name of the first <li> of each <ul> to your name
    for (let i = 0; i < lists.length; i++) {
        if (lists[i].children.length > 0) {
            lists[i].children[0].textContent = 'Alex';
        }
    }
    
    // Add a class called student_list to both of the <ul>'s
    for (let i = 0; i < lists.length; i++) {
        lists[i].classList.add('student_list');
    }
    
    // Add the classes university and attendance to the first <ul>
    if (lists.length > 0) {
        lists[0].classList.add('university', 'attendance');
    }
    
    // Add a "light blue" background color and some padding to the <div>
    container.style.backgroundColor = 'lightblue';
    container.style.padding = '10px';
    
    // Do not display the <li> that contains the text node "Dan"
    const listItems = document.querySelectorAll('li');
    for (let item of listItems) {
        if (item.textContent === 'Dan') {
            item.style.display = 'none';
        }
    }
    
    // Add a border to the <li> that contains the text node "Richard"
    for (let item of listItems) {
        if (item.textContent === 'Richard') {
            item.style.border = '2px solid red';
            item.style.padding = '5px';
        }
    }
    
    // Change the font size of the whole body
    document.body.style.fontSize = '18px';
    
    // Bonus: If the background color of the div is "light blue", alert "Hello x and y"
    if (container.style.backgroundColor === 'lightblue') {
        const users = [];
        if (lists.length > 0) {
            const firstListItems = lists[0].querySelectorAll('li');
            for (let i = 0; i < firstListItems.length; i++) {
                users.push(firstListItems[i].textContent);
            }
        }
        alert(`Hello ${users.join(' and ')}`);
    }
    
    console.log("User manipulation completed!");
}

// Exercise 6: Change the navbar
function manipulateNavbar() {
    // Change the id attribute from navBar to socialNetworkNavigation
    const navbar = document.getElementById('navBar');
    if (navbar) {
        navbar.setAttribute('id', 'socialNetworkNavigation');
        
        // Create a new <li> with "Logout"
        const newLi = document.createElement('li');
        const logoutText = document.createTextNode('Logout');
        newLi.appendChild(logoutText);
        
        // Append the new <li> to the <ul>
        const ul = navbar.querySelector('ul');
        ul.appendChild(newLi);
        
        // Retrieve the first and last <li> elements and display their text
        const firstLi = ul.firstElementChild;
        const lastLi = ul.lastElementChild;
        
        console.log(`First link: ${firstLi.textContent}`);
        console.log(`Last link: ${lastLi.textContent}`);
        
        return {
            firstLink: firstLi.textContent,
            lastLink: lastLi.textContent
        };
    }
    return null;
}

// Exercise 7: My Book List
const allBooks = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=100",
        alreadyRead: true
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=100",
        alreadyRead: false
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=100",
        alreadyRead: true
    }
];

function renderBooks() {
    const bookSection = document.querySelector('.listBooks');
    if (!bookSection) {
        console.log("Book section not found!");
        return;
    }
    
    bookSection.innerHTML = ''; // Clear any existing content
    
    for (const book of allBooks) {
        // Create book container
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        
        // Create and add book title and author
        const titleElem = document.createElement('div');
        titleElem.className = 'book-title';
        titleElem.textContent = book.title;
        
        const authorElem = document.createElement('div');
        authorElem.className = 'book-author';
        authorElem.textContent = `by ${book.author}`;
        
        // Apply red color if book is already read
        if (book.alreadyRead) {
            titleElem.style.color = 'red';
            authorElem.style.color = 'red';
        }
        
        // Create and add book image
        const imgElem = document.createElement('img');
        imgElem.src = book.image;
        imgElem.alt = `${book.title} cover`;
        imgElem.style.width = '100px';
        
        // Append all elements to the book container
        bookDiv.appendChild(imgElem);
        bookDiv.appendChild(titleElem);
        bookDiv.appendChild(authorElem);
        
        // Add book container to the section
        bookSection.appendChild(bookDiv);
    }
    
    console.log("Books rendered successfully!");
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - initializing exercises");
    
    // Test Exercise 5 if the container exists
    if (document.getElementById('container')) {
        console.log("\n=== Exercise 5 ===");
        manipulateUsers();
    }
    
    // Test Exercise 6 if the navbar exists
    if (document.getElementById('navBar')) {
        console.log("\n=== Exercise 6 ===");
        const navbarResult = manipulateNavbar();
        if (navbarResult) {
            console.log(`First link: ${navbarResult.firstLink}`);
            console.log(`Last link: ${navbarResult.lastLink}`);
        }
    }
    
    // Test Exercise 7 if the book section exists
    if (document.querySelector('.listBooks')) {
        console.log("\n=== Exercise 7 ===");
        renderBooks();
    }
});

// Export functions for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        displayNumbersDivisible,
        myBill,
        changeEnough,
        hotelCost,
        planeRideCost,
        rentalCarCost,
        totalVacationCost,
        manipulateUsers,
        manipulateNavbar,
        renderBooks,
        allBooks
    };
}