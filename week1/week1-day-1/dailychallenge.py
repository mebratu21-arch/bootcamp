# 1️⃣ Declare a variable called first and assign it to the value "Hello World"
first = "Hello World"

# 2️⃣ Write a comment that says "This is a comment."
# This is a comment.

# 3️⃣ Log a message to the terminal that says "I AM A COMPUTER!"
print("I AM A COMPUTER!")

# 4️⃣ Write an if statement that checks if 1 is less than 2 and if 4 is greater than 2.
if 1 < 2 and 4 > 2:
    print("Math is fun.")

# 5️⃣ Assign a variable called nope to an absence of value.
nope = None

# 6️⃣ Use the “and” boolean operator to combine True and False.
result = True and False
print(result)  # Output: False

# 7️⃣ Calculate the length of the string "What's my length?"
length = len("What's my length?")
print(length)  # Output: 17

# 8️⃣ Convert the string "i am shouting" to uppercase.
shout = "i am shouting".upper()
print(shout)  # Output: I AM SHOUTING

# 9️⃣ Convert the string "1000" to the number 1000.
num = int("1000")
print(num)  # Output: 1000

# 🔟 Combine the number 4 with the string "real" to produce "4real".
combo = str(4) + "real"
print(combo)  # Output: 4real

# 11️⃣ Record the output of the expression 3 * "cool".
result1 = 3 * "cool"
print(result1)  # Output: coolcoolcool

# 12️⃣ Record the output of the expression 1 / 0.
# This will cause a ZeroDivisionError
try:
    print(1 / 0)
except ZeroDivisionError:
    print("Error: Cannot divide by zero!")

# 13️⃣ Determine the type of [].
print(type([]))  # Output: <class 'list'>

# 14️⃣ Ask the user for their name, and store it in a variable called name.
name = input("What is your name? ")

# 15️⃣ Ask the user for a number and respond accordingly.
number = float(input("Enter a number: "))

if number < 0:
    print("That number is less than 0!")
elif number > 0:
    print("That number is greater than 0!")
else:
    print("You picked 0!")

# 16️⃣ Find the index of "l" in "apple".
index_l = "apple".index("l")
print(index_l)  # Output: 3

# 17️⃣ Check whether "y" is in "xylophone".
check_y = "y" in "xylophone"
print(check_y)  # Output: True

# 18️⃣ Check whether a string called my_string is all in lowercase.
my_string = "hello"
is_lower = my_string.islower()
print(is_lower)  # Output: True