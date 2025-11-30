# Given classes
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

# Step 1: Create Siamese class
class Siamese(Cat):
    pass

# Step 2: Create a list of cat instances
bengal_cat = Bengal("Leo", 4)
chartreux_cat = Chartreux("Misty", 2)
siamese_cat = Siamese("Sasha", 3)

all_cats = [bengal_cat, chartreux_cat, siamese_cat]

# Step 3: Create a Pets instance
sara_pets = Pets(all_cats)

# Step 4: Take cats for a walk
sara_pets.walk()


'''2'''
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

# Step 2: Create dog instances
dog1 = Dog("Rex", 5, 20)
dog2 = Dog("Buddy", 3, 15)
dog3 = Dog("Max", 4, 18)

# Step 3: Test dog methods
print(dog1.bark())
print(dog2.run_speed())
print(dog1.fight(dog2))
print(dog3.fight(dog1))


