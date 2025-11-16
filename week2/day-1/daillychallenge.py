class Farm:
    """
    Represents a farm that can store and report on different types of animals.
    """

    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type=None, count=1, **kwargs):
        """
        Adds one or more animals to the farm.
        Supports positional arguments or keyword arguments (kwargs).
        """
        # 1. Handle positional arguments (original signature)
        if animal_type is not None:
            self.animals[animal_type] = self.animals.get(animal_type, 0) + count

        # 2. Handle keyword arguments (upgraded feature)
        for animal, quantity in kwargs.items():
            self.animals[animal] = self.animals.get(animal, 0) + quantity

    def get_animal_types(self):
        """Returns a sorted list of unique animal types on the farm."""
        return sorted(self.animals.keys())

    def get_info(self):
        """
        Returns a formatted string listing all animals and their counts,
        including proper alignment.
        """
        if not self.animals:
            return f"{self.name}'s farm\n\n    E-I-E-I-0! (No animals)"

        info = f"{self.name}'s farm\n\n"

        # Find the length of the longest animal name for formatting
        max_length = max(len(animal) for animal in self.animals)

        # Iterate over sorted items and apply string formatting
        for animal, count in sorted(self.animals.items()):
            # Use f-string with alignment specifier
            info += f"{animal:<{max_length}} : {count}\n"

        info += "\n    E-I-E-I-0!"
        return info

    def get_short_info(self):
        """
        Returns a concise sentence summarizing the animals on the farm,
        handling pluralization and proper list formatting.
        """
        animal_types = self.get_animal_types()

        if not animal_types:
            return f"{self.name}'s farm has no animals."

        # Create list of animal names, handling pluralization (simple 's' assumption)
        animal_names = []
        for animal in animal_types:
            count = self.animals[animal]
            # Use 's' for plural if count is greater than 1
            name_with_plural = f"{animal}s" if count > 1 else animal
            animal_names.append(name_with_plural)

        # Format the list of names using linguistic rules
        if len(animal_names) == 1:
            animals_str = animal_names[0]
        elif len(animal_names) == 2:
            animals_str = f"{animal_names[0]} and {animal_names[1]}"
        else:
            # Join all but the last with a comma, then add " and [last]"
            animals_str = f"{', '.join(animal_names[:-1])}, and {animal_names[-1]}"

        return f"{self.name}'s farm has {animals_str}."


# --- Testing the Rewritten Code ---

print("=== Original Test ===")
macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)
print(macdonald.get_info())

print("\n=== Bonus Features Test ===")
print("Animal types:", macdonald.get_animal_types())
print(macdonald.get_short_info())

print("\n=== Upgraded add_animal Test (kwargs) ===")
farm2 = Farm("Old MacDonald")
# Test adding multiple animals with kwargs
farm2.add_animal(cow=5, sheep=2, goat=12, horse=3)
# Test adding to existing animals using positional args
farm2.add_animal('cow', 1)
print(farm2.get_info())
print(farm2.get_short_info())

print("\n=== Edge Case Test ===")
single_animal_farm = Farm("Tiny Farm")
single_animal_farm.add_animal('chicken')
print(single_animal_farm.get_short_info())

empty_farm = Farm("Empty Farm")
print(empty_farm.get_short_info())