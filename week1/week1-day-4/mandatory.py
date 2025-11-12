import random

# =========================================================
# Exercise 1: What Are You Learning?
# =========================================================

def display_message():
    """Displays a message about what I am currently learning."""
    print("--- Exercise 1 Output ---")
    print("I am learning about functions in Python.")

display_message()


# =========================================================
# Exercise 2: What’s Your Favorite Book?
# =========================================================

def favorite_book(title):
    """Displays a message about a favorite book."""
    print("\n--- Exercise 2 Output ---")
    print(f"One of my favorite books is {title}.")

favorite_book("The Hitchhiker's Guide to the Galaxy")


# =========================================================
#  Exercise 3: Some Geography
# =========================================================

def describe_city(city, country="Unknown"):
    """Describes a city and its country."""
    print(f"{city} is in {country}.")

print("\n--- Exercise 3 Output ---")
# Call 1: Providing both city and country
describe_city("Reykjavik", "Iceland")
# Call 2: Providing only the city (uses the default)
describe_city("Paris")


# =========================================================
# Exercise 4: Random
# =========================================================

def number_checker(user_number):
    """Generates a random number and compares it to the user's number."""
    random_number = random.randint(1, 100)

    if user_number == random_number:
        print("Success!")
    else:
        print(f"Fail! Your number: {user_number}, Random number: {random_number}")

print("\n--- Exercise 4 Output (Varies) ---")
# Example call with a user number (e.g., 42)
number_checker(42)


# =========================================================
#  Exercise 5: Let’s Create Some Personalized Shirts!
# =========================================================

def make_shirt(size="large", text="I love Python"):
    """Prints a summary of the shirt's size and the message on it."""
    print(f"The size of the shirt is {size} and the text is {text}.")

print("\n--- Exercise 5 Output ---")
# 1. Large shirt with default message
make_shirt()
# 2. Medium shirt with default message
make_shirt(size="medium")
# 3. Small shirt with custom message
make_shirt("small", "Custom message.")
# 4. Keyword arguments
make_shirt(text="Hello World!", size="x-small")


# =========================================================
#  Exercise 6: Magicians…
# =========================================================

magician_names = ['Harry Houdini', 'David Blaine', 'Criss Angel']

def show_magicians(names):
    """Prints each magician's name from the list."""
    for name in names:
        print(name)

def make_great(names):
    """Adds 'the Great' to each magician's name in the list."""
    # Modify the list in place
    for i in range(len(names)):
        names[i] = names[i] + " the Great"

print("\n--- Exercise 6 Output ---")
make_great(magician_names)
show_magicians(magician_names)


# =========================================================
# Exercise 7: Temperature Advice
# =========================================================

# Step 1 & 4 (Bonus): Floating-point random temperature
def get_random_temp():
    """Returns a random floating-point temperature between -10 and 40 Celsius."""
    return random.uniform(-10, 40)

def provide_advice(temperature):
    """Prints advice based on the given temperature."""
    # Step 3: Provide Temperature-Based Advice
    if temperature < 0:
        print("Brrr, that's freezing! Wear some extra layers today.")
    elif 0 <= temperature <= 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 16 < temperature <= 23:
        print("Nice weather.")
    elif 23 < temperature <= 32:
        print("A bit warm, stay hydrated.")
    else: # 32 < temperature <= 40
        print("It’s really hot! Stay cool.")

# Step 2: main() function to run Exercise 7
def main_exercise_7():
    current_temp = get_random_temp()
    print("\n--- Exercise 7 Output (Varies) ---")
    print(f"The temperature right now is {current_temp:.1f} degrees Celsius.")
    provide_advice(current_temp)

main_exercise_7()