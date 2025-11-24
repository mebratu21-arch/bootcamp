/************************************************************
 *  UTILITY HELPERS
 ************************************************************/

// Get valid numeric input (used in vacation cost)
function getValidNumber(message) {
    let value;
    do {
        value = prompt(message);
    } while (!value || isNaN(value) || Number(value) <= 0);
    return Number(value);
}

// Trim and normalize input strings
function normalize(str) {
    return String(str).trim();
}

/************************************************************
 *  EXERCISE 1 — Numbers Divisible by X
 ************************************************************/
function displayNumbersDivisible(divisor = 23) {
    const numbers = [];
    let sum = 0;

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


/************************************************************
 *  EXERCISE 2 — Shopping List
 ************************************************************/
const stock = { 
    banana: 6, 
    apple: 0,
    pear: 12,
    orange: 32,
    blueberry: 1
};

const prices = {    
    banana: 4, 
    apple: 2, 
    pear: 1,
    orange: 1.5,
    blueberry: 10
};

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
    let total = 0;

    shoppingList.forEach(item => {
        if (stock[item] > 0) {
            console.log(`Added ${item} — $${prices[item]}`);
            total += prices[item];
            stock[item]--;
        } else {
            console.log(`${item} is out of stock.`);
        }
    });

    console.log(`Total: $${total}`);
    return total;
}


/************************************************************
 *  EXERCISE 3 — Enough Change?
 ************************************************************/
function changeEnough(itemPrice, coins) {
    const [q, d, n, p] = coins;
    const total =
        q * 0.25 +
        d * 0.1 +
        n * 0.05 +
        p * 0.01;

    console.log(`Price: $${itemPrice}`);
    console.log(`Total change: $${total.toFixed(2)}`);

    return total >= itemPrice;
}


/************************************************************
 *  EXERCISE 4 — Vacation Cost
 ************************************************************/
function hotelCost(nights) {
    return nights * 140;
}

function planeRideCost(destination) {
    const d = destination.toLowerCase();
    if (d === "london") return 183;
    if (d === "paris") return 220;
    return 300;
}

function rentalCarCost(days) {
    let cost = days * 40;
    if (days > 10) cost *= 0.95; // 5% discount
    return cost;
}

function totalVacationCost() {
    const nights = getValidNumber("How many nights?");
    const destination = normalize(prompt("Destination:"));
    const days = getValidNumber("Car rental days:");

    const hotel = hotelCost(nights);
    const plane = planeRideCost(destination);
    const car = rentalCarCost(days);

    const total = hotel + plane + car;

    console.log(`
Vacation to ${destination}
Hotel: $${hotel}
Plane: $${plane}
Car: $${car}
Total: $${total}
    `);

    return { hotel, plane, car, total };
}


/************************************************************
 *  EXERCISE 5 — Users + DOM Manipulation
 ************************************************************/
function manipulateUsers() {
    const container = document.querySelector('#container');
    if (!container) return;

    const lists = [...document.querySelectorAll('.list')];

    // Change "Pete" → "Richard"
    lists[0]?.children[1] && (lists[0].children[1].textContent = "Richard");

    // Remove second <li> from second <ul>
    lists[1]?.children[1]?.remove();

    // Change first <li> of each list to your name
    lists.forEach(list => {
        list.children[0].textContent = "Alex";
    });

    // Add classes
    lists.forEach(list => list.classList.add("student_list"));
    lists[0]?.classList.add("university", "attendance");

    // Style container
    container.style.cssText = `
        background: lightblue;
        padding: 10px;
    `;

    // Hide "Dan"
    document.querySelectorAll("li").forEach(li => {
        if (li.textContent === "Dan") li.classList.add("hidden");
    });

    // Border on "Richard"
    document.querySelectorAll("li").forEach(li => {
        if (li.textContent === "Richard") {
            li.style.border = "2px solid red";
            li.style.padding = "5px";
        }
    });

    // Bonus alert
    if (container.style.backgroundColor === "lightblue") {
        const names = [...lists[0].querySelectorAll("li")].map(li => li.textContent);
        alert(`Hello ${names.join(" and ")}`);
    }

    console.log("User DOM manipulation complete.");
}


/************************************************************
 *  EXERCISE 6 — Navbar
 ************************************************************/
function manipulateNavbar() {
    const nav = document.querySelector('#navBar');
    if (!nav) return;

    nav.id = "socialNetworkNavigation";

    const ul = nav.querySelector('ul');

    const li = document.createElement('li');
    li.textContent = "Logout";
    ul.appendChild(li);

    console.log(`First: ${ul.firstElementChild.textContent}`);
    console.log(`Last: ${ul.lastElementChild.textContent}`);
}


/************************************************************
 *  EXERCISE 7 — Book List
 ************************************************************/
const allBooks = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=100",
        alreadyRead: true
    },
    {
        title: "Harry Potter",
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
    const section = document.querySelector(".listBooks");
    if (!section) return;

    section.innerHTML = "";

    allBooks.forEach(book => {
        const div = document.createElement("div");
        div.className = "book";

        div.innerHTML = `
            <img src="${book.image}" width="100" alt="book cover">
            <div class="book-title" style="color:${book.alreadyRead ? "red" : "black"}">
                ${book.title}
            </div>
            <div class="book-author" style="color:${book.alreadyRead ? "red" : "black"}">
                by ${book.author}
            </div>
        `;

        section.appendChild(div);
    });
}


/************************************************************
 *  DOM READY — AUTO INITIALIZE
 ************************************************************/
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Ready — Initializing...");

    document.querySelector('#container') && manipulateUsers();
    document.querySelector('#navBar') && manipulateNavbar();
    document.querySelector('.listBooks') && renderBooks();
});
