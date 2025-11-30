# Exercise 1: Hello World
print("=== Exercise 1: Hello World ===")
print("Hello world\nHello world\nHello world\nHello world")
print()

# Exercise 2: Some Math
print("=== Exercise 2: Some Math ===")
result = (99**3) * 8
print(f"(99^3)*8 = {result}")
print()

# Exercise 3: What is the output?
print("=== Exercise 3: What is the output? ===")
print("5 < 3:", 5 < 3)  # False
print("3 == 3:", 3 == 3)  # True
print("3 == '3':", 3 == "3")  # False
print("'Hello' == 'hello':", "Hello" == "hello")  # False
# print("'3' > 3:")  # This would cause TypeError
print()

# Exercise 4: Your computer brand
print("=== Exercise 4: Your computer brand ===")
computer_brand = "Dell"  # Change to your actual computer brand
print(f"I have a {computer_brand} computer.")
print()

# Exercise 5: Your information
print("=== Exercise 5: Your information ===")
name = "John"  # Change to your name
age = 25  # Change to your age
shoe_size = 42  # Change to your shoe size
info = f"My name is {name}, I'm {age} years old, wear size {shoe_size} shoes, and I love coding!"
print(info)
print()

# Exercise 6: A & B
print("=== Exercise 6: A & B ===")
a = 15
b = 10
if a > b:
    print("Hello World")
print()

# Exercise 7: Odd or Even
print("=== Exercise 7: Odd or Even ===")
try:
    number = int(input("Enter a number: "))
    if number % 2 == 0:
        print(f"{number} is even")
    else:
        print(f"{number} is odd")
except ValueError:
    print("Please enter a valid number!")
print()

# Exercise 8: What's your name?
print("=== Exercise 8: What's your name? ===")
my_name = "John"  # Change to your actual name
user_name = input("What's your name? ")

if user_name.lower() == my_name.lower():
    print("Wow! We have the same name! What are the odds? ")
else:
    print(f"Nice to meet you, {user_name}! {my_name} is definitely a better name though! ")
print()

# Exercise 9: Tall enough to ride a roller coaster
print("=== Exercise 9: Tall enough to ride a roller coaster ===")
try:
    height = float(input("Enter your height in centimeters: "))
    
    if height > 145:
        print("You are tall enough to ride!")
    else:
        print("You need to grow some more to ride.")
except ValueError:
    print("Please enter a valid height!")