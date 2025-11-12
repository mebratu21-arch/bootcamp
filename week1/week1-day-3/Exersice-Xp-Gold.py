# Exercise 1: Initialize the dictionary
birthdays = {
    "Alice": "1990/05/15",
    "Bob": "1985/10/20",
    "Charlie": "1992/03/01",
    "Diana": "1995/12/31",
    "Eve": "1988/07/25"
}

print(" Welcome to the Birthday Look-up System!")
print("---")

# Exercise 3: Add Your Own Birthday
print("1. Add a new birthday entry.")
new_name = input("Enter the name of the person you want to add: ").strip()
new_birthday = input(f"Enter {new_name}'s birthday (YYYY/MM/DD): ").strip()

# Add the new data to the dictionary
birthdays[new_name] = new_birthday
print(f"{new_name}'s birthday ({new_birthday}) has been added!")
print("---")

# Exercise 2: Print out all names in the dictionary
print("2. Here are the names currently in the list:")
# Print all keys (names) in a comma-separated format
print(", ".join(birthdays.keys()))
print("---")

# Exercise 1 & 2: Look up a birthday
person_name = input("3. Enter a person's name to find their birthday: ").strip()

# Check if the name exists (fulfills Exercise 2 error message requirement)
if person_name in birthdays:
    # Exercise 1 & 3: Name found, print the birthday
    birthday = birthdays[person_name]
    print(f" **{person_name}'s** birthday is: **{birthday}**")
else:
    # Exercise 2: Name not found, print an error message
    print(f" Sorry, we don’t have the birthday information for **{person_name}**.")
    items_prices = {
    "banana": 4,
    "apple": 2,
    "orange": 1.5,
    "pear": 3
}

# 1. Print all items and their prices in a sentence
sentence_parts = []
for item, price in items_prices.items():
    sentence_parts.append(f"{item} at ${price}")

result_sentence = "The available items and their prices are: " + ", ".join(sentence_parts) + "."

print("### Part 1: Items and Prices")
print(result_sentence)
items_stock = {
    "banana": {"price": 4, "stock": 10},
    "apple": {"price": 2, "stock": 5},
    "orange": {"price": 1.5, "stock": 24},
    "pear": {"price": 3, "stock": 1}
}

total_cost = 0.0

# 2. Calculate how much it would cost to buy everything in stock
for item, details in items_stock.items():
    # Calculate item cost = price * stock
    item_cost = details["price"] * details["stock"]
    
    # Accumulate the total cost
    total_cost += item_cost
    
    # Optional print for clarity
    print(f"* Cost for {item} (Stock: {details['stock']}): ${item_cost:.2f}")

print("---")
print(f"### Part 2: Total Cost of Stock")
print(f" The total cost to buy everything in stock is: **${total_cost:.2f}**")
# Calculation: (4*10) + (2*5) + (1.5*24) + (3*1) = 40 + 10 + 36 + 3 = 89
