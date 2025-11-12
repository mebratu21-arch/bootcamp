#  Exercise 1: Converting Lists into Dictionaries
# Given two lists, zip them together to create a dictionary
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

# Method 1: Using zip and dict()
my_dict = dict(zip(keys, values))
print(my_dict)
# Output: {'Ten': 10, 'Twenty': 20, 'Thirty': 30}

#  Exercise 2: Cinemax #2
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
total_cost = 0

for member, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    print(f"{member.title()} pays ${price}")
    total_cost += price

print("Total cost:", total_cost)


#  Exercise 3: Zara
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}

# Modify number_stores
brand["number_stores"] = 2

# Print sentence describing Zara's clients
print("Zara's clients are", ", ".join(brand["type_of_clothes"]))

# Add new key country_creation
brand["country_creation"] = "Spain"

# Add "Desigual" to international_competitors if exists
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

# Delete creation_date key
brand.pop("creation_date")

# Print last item in international_competitors
print("Last international competitor:", brand["international_competitors"][-1])

# Print major colors in the US
print("Major US colors:", brand["major_color"]["US"])

# Print number of keys
print("Number of keys:", len(brand))

# Print all keys
print("All dictionary keys:", list(brand.keys()))

# Bonus: more_on_zara and merging the dictionaries
more_on_zara = {"creation_date": 1975, "number_stores": 10000}
brand.update(more_on_zara)
print("After merge:", brand)

#  Exercise 4: Disney Characters
users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]

# 1. Characters to indices
char_to_index = {name: i for i, name in enumerate(users)}
print(char_to_index)

# 2. Indices to characters
index_to_char = {i: name for i, name in enumerate(users)}
print(index_to_char)

# 3. Characters sorted alphabetically, then mapped to their new index
sorted_users = sorted(users)
sorted_char_to_index = {name: i for i, name in enumerate(sorted_users)}
print(sorted_char_to_index)
