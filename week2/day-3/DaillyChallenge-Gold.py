# Compact version with focused exception handling
data_list = []

for i in range(5):
    while True:
        try:
            print(f"\nPerson {i+1}:")
            name = input("Name: ").strip()
            if not name:
                raise ValueError("Name is required")
            
            age = int(input("Age: "))
            if age < 0:
                raise ValueError("Age cannot be negative")
            
            score = int(input("Score: "))
            if score < 0 or score > 100:
                raise ValueError("Score must be 0-100")
            
            data_list.append((name, age, score))
            break
            
        except ValueError as e:
            print(f"Input error: {e}. Please re-enter all details for this person.")
        except Exception as e:
            print(f"Unexpected error: {e}. Please try again.")

# Sort using lambda function
try:
    sorted_data = sorted(data_list, key=lambda x: (x[0].lower(), x[1], x[2]))
    print("\nSorted list:", sorted_data)
except Exception as e:
    print(f"Error during sorting: {e}")
    print("Original data:", data_list)