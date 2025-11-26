// =====================================================
// EXERCISE 1 – SCOPE
// =====================================================

function log(msg) {
    console.log(msg);
}

// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    log("funcOne → " + a);  // 3
}
funcOne();

// #2
let a2 = 0;

function funcTwo() {
    a2 = 5;
}

function funcThree() {
    log("funcThree → " + a2);
}

funcThree();   // 0
funcTwo();     // now a2 = 5
funcThree();   // 5

// #3
function funcFour() {
    window.a3 = "hello";
}

function funcFive() {
    log("funcFive → " + a3);
}

funcFour();
funcFive();

// #4
let a4 = 1;

function funcSix() {
    let a4 = "test";
    log("funcSix → " + a4); // test
}
funcSix();

// #5
let a5 = 2;

if (true) {
    let a5 = 5;
    log("Inside if block → " + a5);
}

log("Outside if block → " + a5);


// =====================================================
// EXERCISE 2 – TERNARY
// =====================================================

const winBattle = () => true;

let experiencePoints = winBattle() ? 10 : 1;

log("Experience Points → " + experiencePoints);


// =====================================================
// EXERCISE 3 – isString
// =====================================================

const isString = value => typeof value === "string";

log("isString('hello') → " + isString("hello"));
log("isString([1,2,3]) → " + isString([1,2,3]));


// =====================================================
// EXERCISE 4 – SUM
// =====================================================

const sum = (a, b) => a + b;

log("Sum 4 + 6 → " + sum(4, 6));


// =====================================================
// EXERCISE 5 – KG TO GRAMS
// =====================================================

// Function declaration
function toGram1(kg) {
    return kg * 1000;
}
log("toGram1(5) → " + toGram1(5));

// Function expression
const toGram2 = function(kg) {
    return kg * 1000;
}
log("toGram2(5) → " + toGram2(5));

// Arrow one-liner
const toGram3 = kg => kg * 1000;

log("toGram3(5) → " + toGram3(5));


// =====================================================
// EXERCISE 6 – FORTUNE TELLER
// =====================================================

(function (numKids, partner, location, job) {
    log(`Fortune → You will be a ${job} in ${location}, married to ${partner} with ${numKids} kids.`);
})(3, "Sara", "Israel", "Programmer");


// =====================================================
// EXERCISE 7 – WELCOME (NAVBAR)
// =====================================================

(function(name) {
    log(`Navbar → Welcome, ${name}`);
})("John");


// =====================================================
// EXERCISE 8 – JUICE BAR
// =====================================================

// ---------- PART I ----------
function makeJuice(size) {

    function addIngredients(i1, i2, i3) {
        log(`Juice 1 → ${size} juice with ${i1}, ${i2}, ${i3}`);
    }

    addIngredients("Apple", "Banana", "Orange");
}

makeJuice("Large");


// ---------- PART II ----------
function makeJuice2(size) {
    let ingredients = [];

    function addIngredients(i1, i2, i3) {
        ingredients.push(i1, i2, i3);
    }

    function displayJuice() {
        log(`Juice 2 → ${size} juice with: ${ingredients.join(", ")}`);
    }

    addIngredients("Apple", "Lemon", "Kiwi");
    addIngredients("Banana", "Mango", "Pineapple");

    displayJuice();
}

makeJuice2("Medium");
