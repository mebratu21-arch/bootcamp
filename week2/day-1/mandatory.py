class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age


# Step 1: Take input from user to create cat objects
print("Enter details for 3 cats:")

name1 = input("Enter name of cat 1: ")
age1 = int(input("Enter age of cat 1: "))
cat1 = Cat(name1, age1)

name2 = input("Enter name of cat 2: ")
age2 = int(input("Enter age of cat 2: "))
cat2 = Cat(name2, age2)

name3 = input("Enter name of cat 3: ")
age3 = int(input("Enter age of cat 3: "))
cat3 = Cat(name3, age3)


# Step 2: Function to find oldest cat
def find_oldest_cat(cat1, cat2, cat3):
    oldest = cat1

    if cat2.age > oldest.age:
        oldest = cat2
    if cat3.age > oldest.age:
        oldest = cat3

    return oldest


# Step 3: Print oldest cat
oldest_cat = find_oldest_cat(cat1, cat2, cat3)
           
            #2

print(f"\nThe oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old.")
class Dog():
    def __init__(self, name, height):
        self.name = name
        self.heigth = height
        
    def bark(self):
        print(f"{self.name} goes woof!")
        
    def jump(self):
        print(f"{self.name} jumps {self.heigth * 2} cm high!")
        

dog1 =Dog("Rex", 50)
dog2 = Dog("Teodora", 23)

dog1.bark()
dog1.jump()

dog2.bark()
dog2.jump()"""

#3
class Song():
    def __init__(self, lyrics):
        self.lyrics = lyrics

    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)
            
stairway = Song(["There's a lady who's sure", "all that glitters is gold", "and she's buying a stairway to heaven", "Oh, oh, oh, and she's buying a stairway to heaven"])

stairway.sing_me_a_song()


#4


class Zoo:
    def __init__(self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []
        self.groups = {}

    # Add one or more animals (*args allows multiple)
    def add_animal(self, *new_animals):
        for animal in new_animals:
            if animal not in self.animals:
                self.animals.append(animal)
                print(f"{animal} added to the zoo.")
            else:
                print(f"{animal} is already in the zoo.")

    # Display all animals
    def get_animals(self):
        print("\nAnimals in the zoo:")
        for animal in self.animals:
            print(animal)

    # Sell (remove) an animal
    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"{animal_sold} has been sold.")
        else:
            print(f"{animal_sold} not found in the zoo.")

    # Sort animals alphabetically and group by first letter
    def sort_animals(self):
        self.animals.sort()
        groups = {}
        for animal in self.animals:
            letter = animal[0].upper()
            if letter not in groups:
                groups[letter] = []
            groups[letter].append(animal)
        self.groups = groups
        return self.groups

    # Print grouped animals
    def get_groups(self):
        if not self.groups:
            print("No groups available. Please run sort_animals() first.")
            return
        print("\nGrouped animals:")
        for letter, animals in self.groups.items():
            print(f"{letter}: {animals}")


# Example Usage


# Step 2: Create a Zoo instance
brooklyn_safari = Zoo("Brooklyn Safari")

# Step 3: Use Zoo methods
brooklyn_safari.add_animal("Giraffe", "Bear", "Baboon", "Cat", "Cougar", "Zebra", "Lion")
brooklyn_safari.get_animals()

brooklyn_safari.sell_animal("Bear")
brooklyn_safari.get_animals()

brooklyn_safari.sort_animals()
brooklyn_safari.get_groups()

                                    
