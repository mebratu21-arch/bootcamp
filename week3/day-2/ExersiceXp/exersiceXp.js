/************************************************************
 * Exercise 1: Find numbers divisible by 23
 ************************************************************/
function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    let result = [];
    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            result.push(i);
            sum += i;
        }
    }
    console.log(result.join(" "));
    console.log("Sum:", sum);
}
// displayNumbersDivisible();       // default 23
// displayNumbersDivisible(3);      // bonus example


/************************************************************
 * Exercise 2: Shopping List
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
            total += prices[item];
            stock[item]--; // bonus: decrease stock
        }
    });
    return total;
}
// console.log("Total bill:", myBill());


/************************************************************
 * Exercise 3: What’s in my wallet?
 ************************************************************/
function changeEnough(itemPrice, amountOfChange) {
    const [quarters, dimes, nickels, pennies] = amountOfChange;
    const total = quarters*0.25 + dimes*0.10 + nickels*0.05 + pennies*0.01;
    return total >= itemPrice;
}
// console.log(changeEnough(4.25, [25, 20, 5, 0])); // true
// console.log(changeEnough(14.11, [2,100,0,0])); // false
// console.log(changeEnough(0.75, [0,0,20,5]));   // true


/************************************************************
 * Exercise 4: Vacation Costs
 ************************************************************/
function hotelCost(nights) {
    return nights * 140;
}

function planeRideCost(destination) {
    destination = destination.toLowerCase();
    if (destination === "london") return 183;
    if (destination === "paris") return 220;
    return 300;
}

function rentalCarCost(days) {
    let cost = days * 40;
    if (days > 10) cost *= 0.95;
    return cost;
}

function totalVacationCost() {
    const nights = Number(prompt("How many nights at hotel?"));
    const destination = prompt("Destination?");
    const days = Number(prompt("Number of car rental days?"));

    const hotel = hotelCost(nights);
    const plane = planeRideCost(destination);
    const car = rentalCarCost(days);

    console.log(`Hotel: $${hotel}, Plane: $${plane}, Car: $${car}`);
    console.log("Total vacation cost:", hotel + plane + car);
}
// totalVacationCost(); // Uncomment to run


/************************************************************
 * Exercise 5: Users
 ************************************************************/
function manipulateUsersDOM() {
    const container = document.getElementById("container");
    console.log(container);

    const uls = document.querySelectorAll("ul.list");

    // Change Pete to Richard
    uls.forEach(ul => {
        ul.querySelectorAll("li").forEach(li => {
            if (li.textContent === "Pete") li.textContent = "Richard";
        });
    });

    // Delete second <li> of second <ul>
    if (uls[1].children[1]) uls[1].removeChild(uls[1].children[1]);

    // Change first <li> of each <ul> to your name
    uls.forEach(ul => {
        if (ul.children[0]) ul.children[0].textContent = "YourName";
    });

    // Add classes
    uls.forEach(ul => ul.classList.add("student_list"));
    uls[0].classList.add("university", "attendance");

    // Style container
    container.style.backgroundColor = "lightblue";
    container.style.padding = "10px";

    // Hide li with text "Dan" & border for Richard
    document.querySelectorAll("li").forEach(li => {
        if (li.textContent === "Dan") li.style.display = "none";
        if (li.textContent === "Richard") li.style.border = "1px solid black";
    });

    // Change font size of body
    document.body.style.fontSize = "18px";

    // Bonus alert
    if (container.style.backgroundColor === "lightblue") {
        const users = Array.from(document.querySelectorAll("li"))
                           .map(li => li.textContent)
                           .filter(name => name !== "");
        alert(`Hello ${users.join(" and ")}`);
    }
}
// manipulateUsersDOM(); // Uncomment to run


/************************************************************
 * Exercise 6: Change the navbar
 ************************************************************/
function updateNavbar() {
    const navBar = document.getElementById("navBar");

    // Change id
    navBar.setAttribute("id", "socialNetworkNavigation");

    // Add new li
    const ul = navBar.querySelector("ul");
    const li = document.createElement("li");
    li.textContent = "Logout";
    ul.appendChild(li);

    // Log first and last li
    console.log("First li:", ul.firstElementChild.textContent);
    console.log("Last li:", ul.lastElementChild.textContent);
}
// updateNavbar(); // Uncomment to run


/************************************************************
 * Exercise 7: My Book List
 ************************************************************/
function displayBooks() {
    const section = document.querySelector(".listBooks");
    const allBooks = [
        { title: "Harry Potter", author: "J.K. Rowling", image: "https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg", alreadyRead: true },
        { title: "The Hobbit", author: "J.R.R. Tolkien", image: "https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg", alreadyRead: false }
    ];

    allBooks.forEach(book => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        p.textContent = `${book.title} written by ${book.author}`;
        if (book.alreadyRead) p.style.color = "red";

        const img = document.createElement("img");
        img.src = book.image;
        img.style.width = "100px";

        div.appendChild(p);
        div.appendChild(img);
        section.appendChild(div);
    });
}
// displayBooks(); // Uncomment to run
