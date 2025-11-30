# Step 1: Ask the user for input
user_string = input("Enter a string that is exactly 10 characters long: ")

# Step 2: Check the length of the string
if len(user_string) < 10:
    print("String not long enough.")
elif len(user_string) > 10:
    print("String too long.")
else:
    print("Perfect string")

    # Step 3: Print the first and last characters
    print("First character:", user_string[0])
    print("Last character:", user_string[-1])

    # Step 4: Build and print the string character by character
    print("Building string:")
    for i in range(1, len(user_string) + 1):
        print(user_string[:i])

    # Step 5: Bonus - Jumble the string
    import random
    chars = list(user_string)    # Convert string into a list of characters
    random.shuffle(chars)        # Shuffle the characters
    jumbled_string = ''.join(chars)
    print("Jumbled string:", jumbled_string)
