#  Exercise 1: Favorite Numbers (Sets)
print("\n--- Exercise 1: Favorite Numbers ---")
my_fav_numbers = {3, 7, 11}
my_fav_numbers.add(15)
my_fav_numbers.add(20)
my_fav_numbers.remove(20)
friend_fav_numbers = {5, 7, 13}
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print("My favorite numbers:", my_fav_numbers)
print("Friend's favorite numbers:", friend_fav_numbers)
print("Our favorite numbers:", our_fav_numbers)

#  Exercise 2: Tuple (Immutability)
print("\n--- Exercise 2: Tuple ---")
my_tuple = (1, 2, 3, 4)
new_tuple = my_tuple + (5, 6)
print("Original tuple:", my_tuple)
print("New tuple:", new_tuple)

#  Exercise 3: List Manipulation
print("\n--- Exercise 3: List Manipulation ---")
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
apple_count = basket.count("Apples")
basket.clear()
print("Final basket:", basket)
print("Number of Apples before clearing:", apple_count)

#  Exercise 4: Floats
print("\n--- Exercise 4: Floats ---")
numbers = []
x = 1.5
while x <= 5:
    numbers.append(x)
    x += 0.5
print("Generated sequence:", numbers)

#  Exercise 5: For Loop
print("\n--- Exercise 5: For Loop ---")
print("Numbers 1 to 20:")
for i in range(1, 21):
    print(i, end=" ")
print("\nNumbers with even index:")
for i in range(1, 21):
    if i % 2 == 0:
        print(i, end=" ")

#  Exercise 6: While Loop
print("\n\n--- Exercise 6: While Loop ---")
while True:
    name = input("Enter your name: ")
    if not name.isdigit() and len(name) >= 3:
        print("Thank you")
        break
    else:
        print("Invalid input, try again.")

# Exercise 7: Favorite Fruits
print("\n--- Exercise 7: Favorite Fruits ---")
fav_fruits = input("Enter your favorite fruits (separated by spaces): ").split()
fruit_choice = input("Enter a fruit: ")
if fruit_choice in fav_fruits:
    print("You chose one of your favorite fruits! Enjoy!")
else:
    print("You chose a new fruit. I hope you enjoy it!")

#  Exercise 8: Pizza Toppings
print("\n--- Exercise 8: Pizza Toppings ---")
toppings = []
base_price = 10
topping_price = 2.5
while True:
    topping = input("Enter a pizza topping (or 'quit' to finish): ")
    if topping.lower() == "quit":
        break
    toppings.append(topping)
    print(f"Adding {topping} to your pizza.")
total_cost = base_price + (len(toppings) * topping_price)
print("Your toppings:", toppings)
print("Total cost: $", total_cost)

#  Exercise 9: Cinemax Tickets
print("\n--- Exercise 9: Cinemax Tickets ---")
family_ages = []
num_people = int(input("How many family members? "))
for i in range(num_people):
    age = int(input(f"Enter age of person {i+1}: "))
    family_ages.append(age)

total_cost = 0
for age in family_ages:
    if age < 3:
        cost = 0
    elif 3 <= age <= 12:
        cost = 10
    else:
        cost = 15
    total_cost += cost
print("Total ticket cost:", total_cost)

# Bonus: Restricted Movie
print("\n--- Bonus: Restricted Movie ---")
group_ages = []
num_people = int(input("How many people in the group? "))
for i in range(num_people):
    age = int(input(f"Enter age of person {i+1}: "))
    group_ages.append(age)
allowed = [age for age in group_ages if 16 <= age <= 21]
print("Final attendees (ages allowed):", allowed)
