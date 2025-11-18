import random

class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        my_score = self.run_speed() * self.weight
        opponent_score = other_dog.run_speed() * other_dog.weight
        if my_score > opponent_score:
            return f"{self.name} wins the fight!"
        elif my_score < opponent_score:
            return f"{other_dog.name} wins the fight!"
        else:
            return "It's a tie!"

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True
        print(f"{self.name} is now trained! ✓")

    def play(self, *args):
        dog_names = ', '.join([self.name] + [dog.name for dog in args])
        print(f" {dog_names} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                "does a barrel roll", 
                "stands on his back legs", 
                "shakes your hand", 
                "plays dead",
                "spins around",
                "jumps through a hoop"
            ]
            trick = random.choice(tricks)
            print(f" {self.name} {trick}!")
        else:
            print(f" {self.name} is not trained yet! Please train the dog first.")

# Test PetDog methods
print("=== Exercise 3: Dogs Domesticated ===")

# Create pet dog instances
pet_dog1 = PetDog("Fido", 2, 10)
pet_dog2 = PetDog("Buddy", 3, 14)
pet_dog3 = PetDog("Max", 1, 8)

print("\n--- Training Demonstration ---")
pet_dog1.train()

print("\n--- Play Demonstration ---")
pet_dog1.play(pet_dog2, pet_dog3)

print("\n--- Trick Demonstration ---")
pet_dog1.do_a_trick()

print("\n--- Untrained Dog Attempt ---")
pet_dog2.do_a_trick()  # Should fail - not trained yet

print("\n--- Training Second Dog ---")
pet_dog2.train()
pet_dog2.do_a_trick()

print("\n--- Group Play Session ---")
pet_dog3.play(pet_dog1)  # Max playing with Fido

print("\n--- Multiple Tricks ---")
print("Fido's tricks:")
pet_dog1.do_a_trick()
pet_dog1.do_a_trick()

print("\nBuddy's tricks:")
pet_dog2.do_a_trick()

"""question 4"""
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""

    def is_18(self):
        return self.age >= 18

class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        person = Person(first_name, age)
        person.last_name = self.last_name
        self.members.append(person)
        print(f" {first_name} {self.last_name} was born into the family!")

    def check_majority(self, first_name):
        found = None
        for person in self.members:
            if person.first_name == first_name:
                found = person
                break
        
        if found:
            if found.is_18():
                print(f" {first_name} is over 18. Your parents accept that you will go out with your friends!")
            else:
                print(f" Sorry {first_name}, you are not allowed to go out with your friends. You are only {found.age} years old.")
        else:
            print(f" No family member by the name '{first_name}' found in the {self.last_name} family.")

    def family_presentation(self):
        print(f"\n Family Presentation: The {self.last_name} Family")
        print("=" * 40)
        for person in self.members:
            adult_status = " (Adult)" if person.is_18() else " (Minor)"
            print(f" {person.first_name} {person.last_name} - {person.age} years old{adult_status}")

    # Additional useful methods
    def get_adult_count(self):
        adults = [person for person in self.members if person.is_18()]
        return len(adults)
    
    def get_minor_count(self):
        minors = [person for person in self.members if not person.is_18()]
        return len(minors)
    
    def find_member(self, first_name):
        for person in self.members:
            if person.first_name == first_name:
                return person
        return None

# Test family methods
print("=== Family Management System ===")

# Create the Smith family
smith_family = Family("Smith")

# Add family members
smith_family.born("Alice", 17)
smith_family.born("Bob", 19)
smith_family.born("Charlie", 15)
smith_family.born("Diana", 25)

# Family presentation
smith_family.family_presentation()

# Check majority status
print("\n=== Permission Checks ===")
smith_family.check_majority("Alice")
smith_family.check_majority("Bob")
smith_family.check_majority("Charlie")
smith_family.check_majority("Diana")
smith_family.check_majority("Eve")  # Non-existent member

# Family statistics
print(f"\n=== Family Statistics ===")
print(f"Total family members: {len(smith_family.members)}")
print(f"Adults in family: {smith_family.get_adult_count()}")
print(f"Minors in family: {smith_family.get_minor_count()}")

# Test finding a specific member
print(f"\n=== Member Lookup ===")
member = smith_family.find_member("Bob")
if member:
    print(f"Found: {member.first_name} {member.last_name}, {member.age} years old")
else:
    print("Member not found")