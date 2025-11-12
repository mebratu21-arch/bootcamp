# ===== EXERCISE 1: TERMINAL & PATH =====
"""
PATH Explanation:
The PATH environment variable contains directories where the OS looks for executables.
When you type 'python3', the system searches through PATH directories to find the executable.
This allows running programs from any location without specifying their full path.
"""

# ===== EXERCISE 2: ALIAS =====
"""
To create alias 'py' for python3:
Linux/Mac: alias py='python3'
Windows CMD: doskey py=python
Windows PowerShell: Set-Alias py python
"""

# ===== EXERCISE 3: OUTPUTS =====
print("=== EXERCISE 3: OUTPUTS ===")
print("3 <= 3 < 9:", 3 <= 3 < 9)  # True
print("3 == 3 == 3:", 3 == 3 == 3)  # True  
print("bool(0):", bool(0))  # False
print('bool(5 == "5"):', bool(5 == "5"))  # False
print('bool(4 == 4) == bool("4" == "4"):', bool(4 == 4) == bool("4" == "4"))  # True
print("bool(bool(None)):", bool(bool(None)))  # False

x = (1 == True)
y = (1 == False)
a = True + 4
b = False + 10

print("x is", x)  # True
print("y is", y)  # False
print("a:", a)    # 5
print("b:", b)    # 10
print()

# ===== EXERCISE 4: CHARACTER COUNT =====
print("=== EXERCISE 4: CHARACTER COUNT ===")
my_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
print("Character count:", len(my_text))
print()

# ===== EXERCISE 5: LONGEST WORD WITHOUT 'A' =====
print("=== EXERCISE 5: LONGEST SENTENCE WITHOUT 'A' ===")
print("Try to create the longest sentence without the letter 'A'!")
print("Type 'quit' to exit the game.\n")

longest_length = 0

while True:
    user_input = input("Enter a sentence without 'A': ").strip()
    
    if user_input.lower() == 'quit':
        print("Thanks for playing! Final record:", longest_length, "characters")
        break
    
    if 'A' in user_input.upper():
        print("Contains 'A'! Try again.\n")
        continue
    
    current_length = len(user_input)
    
    if current_length > longest_length:
        longest_length = current_length
        print(f" CONGRATULATIONS! New record: {longest_length} characters!")
        print("Can you make it even longer?\n")
    else:
        print(f"Current: {current_length} chars | Record: {longest_length} chars - Keep trying!\n")