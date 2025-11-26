// ---------- DATA ----------
let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
};

// ---------- 1. displayGroceries ----------
const displayGroceries = () => {
    groceries.fruits.forEach(fruit => console.log(fruit));
};

displayGroceries();


// ---------- 2. cloneGroceries ----------
const cloneGroceries = () => {

    // Copy of primitive value
    let user = client;

    // Change original primitive
    client = "Betty";

    console.log("client:", client); // Betty
    console.log("user:", user);     // John
    // ❗ user is not changed → because strings are passed by VALUE.


    // Objects = reference copy
    let shopping = groceries;

    // Modify object
    shopping.totalPrice = "35$";

    console.log("shopping.totalPrice:", shopping.totalPrice);      // 35$
    console.log("groceries.totalPrice:", groceries.totalPrice);    // 35$
    // ❗ Both changed → because objects are passed by REFERENCE.


    // Modify nested object
    shopping.other.paid = false;

    console.log("shopping.other.paid:", shopping.other.paid);      // false
    console.log("groceries.other.paid:", groceries.other.paid);    // false
    // ❗ Same reference → both reflect changes.
};

cloneGroceries();
