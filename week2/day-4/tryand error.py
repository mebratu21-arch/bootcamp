child = {
    "name": "John", 
    "age": 5
}
x = child.keys()
print(x)
child["no"] = 2
print(child)
list = [1,2,3,4,5]
list2 = [2,4,7,8,9]
x = [l for l in list if l in list2]
print(x)

str = "world"
str1 = "hello"
x = [s for s in str if s in str1]
print(x)

y = [x for x in range(1,100) if x%2==0]
print(y)

word = "amazing"
y = [x for x in word if x not in "aeiou"]
print(y)

# Generate nested list [[0,1,2], [0,1,2], [0,1,2]]:")

