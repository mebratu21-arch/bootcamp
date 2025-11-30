# Exercise 1: Hello World - I love Python
print("Hello world\n" * 4 + "I love python\n" * 4)

# Exercise 2: What is the Season?
month = int(input("Please enter a month (1-12): "))

if 3 <= month <= 5:
    print("Spring")
elif 6 <= month <= 8:
    print("Summer")
elif 9 <= month <= 11:
    print("Autumn")
else:
    print("Winter")