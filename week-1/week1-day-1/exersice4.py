print("1. Print values one by one:")
lst1 = [1, 2, 3, 4]
for value in lst1:
    print(value)

print("\n2. Values multiplied by 20:")
lst2 = [1, 2, 3, 4]
result2 = [x * 20 for x in lst2]
print(result2)

print("\n3. First letter of each name:")
names = ["Elie", "Tim", "Matt"]
result3 = [name[0] for name in names]
print(result3)

print("\n4. Even values only:")
numbers = [1, 2, 3, 4, 5, 6]
result4 = [x for x in numbers if x % 2 == 0]
print(result4)

print("\n5. Common values in both lists:")
list1 = [1, 2, 3, 4]
list2 = [3, 4, 5, 6]
result5 = [x for x in list1 if x in list2]
print(result5)

print("\n6. Words reversed and lowercase:")
words = ["Elie", "Tim", "Matt"]
result6 = [word[::-1].lower() for word in words]
print(result6)

print("\n7. Common letters in both strings:")
str1 = "first"
str2 = "third"
result7 = [char for char in set(str1) if char in str2]
print(result7)

print("\n8. Numbers divisible by 12 (1-100):")
result8 = [x for x in range(1, 101) if x % 12 == 0]
print(result8)

print("\n9. Remove vowels from 'amazing':")
word = "amazing"
vowels = "aeiou"
result9 = [char for char in word if char.lower() not in vowels]
print(result9)

print("\n10. Generate nested list [[0,1,2], [0,1,2], [0,1,2]]:")
result10 = [[0, 1, 2] for _ in range(3)]
print(result10)

print("\n11. Generate 10x10 grid:")
result11 = [[i for i in range(10)] for _ in range(10)]
print(result11)