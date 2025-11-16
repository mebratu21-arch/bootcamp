import math

class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        # Returns the perimeter (circumference) of the circle
        return 2 * math.pi * self.radius

    def area(self):
        # Returns the area of the circle
        return math.pi * self.radius ** 2

    def describe(self):
        # Prints the geometric definition of a circle
        print("A circle is a set of all points in a plane that are at a fixed distance (radius) from a given point (the center).")
        
 #2
  import random

class MyList:
    def __init__(self, letters):
        self.letters = letters

    def reversed_list(self):
        # Returns the reversed list
        return self.letters[::-1]

    def sorted_list(self):
        # Returns the sorted list
        return sorted(self.letters)

    def generate_random_numbers(self):
        # Bonus: generates a second list of random numbers with the same length as letters
        return [random.randint(0, 100) for _ in range(len(self.letters))]


#3
class MenuManager:
    def __init__(self):
        self.menu = [
            {'name': 'Soup', 'price': 10, 'spice': 'B', 'gluten': False},
            {'name': 'Hamburger', 'price': 15, 'spice': 'A', 'gluten': True},
            {'name': 'Salad', 'price': 18, 'spice': 'A', 'gluten': False},
            {'name': 'French Fries', 'price': 5, 'spice': 'C', 'gluten': False},
            {'name': 'Beef bourguignon', 'price': 25, 'spice': 'B', 'gluten': True},
        ]

    def add_item(self, name, price, spice, gluten):
        self.menu.append({'name': name, 'price': price, 'spice': spice, 'gluten': gluten})

    def update_item(self, name, price, spice, gluten):
        for dish in self.menu:
            if dish['name'] == name:
                dish['price'] = price
                dish['spice'] = spice
                dish['gluten'] = gluten
                return
        print(f"Dish '{name}' not found in the menu.")

    def remove_item(self, name):
        for i, dish in enumerate(self.menu):
            if dish['name'] == name:
                del self.menu[i]
                print("Updated menu:", self.menu)
                return
        print(f"Dish '{name}' not found in the menu.")

