print("1. Create dictionary from list of tuples:")
lst1 = [("name", "Elie"), ("job", "Instructor")]
result1 = dict(lst1)
print(result1)

print("\n2. Create dictionary from two lists:")
keys2 = ["CA", "NJ", "RI"]
values2 = ["California", "New Jersey", "Rhode Island"]
result2 = dict(zip(keys2, values2))
print(result2)

print("\n3. Vowels dictionary with 0 values:")
vowels = ['a', 'e', 'i', 'o', 'u']
result3 = {}
for vowel in vowels:
    result3[vowel] = 0
print(result3)

print("\n4. Alphabet position to letter dictionary:")
import string
result4 = {}
for i, letter in enumerate(string.ascii_uppercase, 1):
    result4[i] = letter
print(result4)

print("\nSuper Bonus: Vowel count in 'awesome sauce':")
text = "awesome sauce"
vowels = 'aeiou'
result_bonus = {vowel: 0 for vowel in vowels}  # Initialize with zeros

for char in text.lower():
    if char in vowels:
        result_bonus[char] += 1

print(result_bonus)