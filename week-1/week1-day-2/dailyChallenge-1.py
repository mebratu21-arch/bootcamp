# Challenge 1: Multiples List
print("=== Challenge 1: Multiples List ===")
number = int(input("Enter a number: "))
length = int(input("Enter the length: "))

# Generate multiples list
multiples = [number * i for i in range(1, length + 1)]
print(f"Multiples: {multiples}")

print("\n" + "="*50 + "\n")

# Challenge 2: Remove Consecutive Duplicate Letters
print("=== Challenge 2: Remove Consecutive Duplicates ===")
word = input("Enter a word: ")

# Process the string to remove consecutive duplicates
result = ""
prev_char = ""

for char in word:
    if char != prev_char:
        result += char
        prev_char = char

print(f"Original: {word}")
print(f"Modified: {result}")