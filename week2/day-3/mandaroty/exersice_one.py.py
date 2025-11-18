"""
exercise_one.py - Main file for Exercise 2
Imports and uses functions from func.py
"""

# Different import methods demonstrated:

# Method 1: Import entire module
import func

# Method 2: Import specific functions
from func import sum_numbers, sum_numbers_with_validation

# Method 3: Import with alias
# from func import sum_numbers as add_numbers

def main():
    print("=" * 50)
    print("EXERCISE 2: Import Demonstration")
    print("=" * 50)
    
    # Using Method 1: module.function()
    print("\n1. Using import func:")
    func.sum_numbers(15, 25)
    
    # Using Method 2: direct function call
    print("\n2. Using from func import sum_numbers:")
    sum_numbers(30, 40)
    
    # Using the validation function
    print("\n3. Using sum_numbers_with_validation:")
    try:
        sum_numbers_with_validation(10, 20)
        sum_numbers_with_validation(5.5, 4.5)
        
        # This will raise an error
        sum_numbers_with_validation("abc", 10)
        
    except TypeError as e:
        print(f"❌ Error: {e}")
    
    # Demonstrate multiple operations
    print("\n4. Multiple operations:")
    numbers_to_add = [(1, 2), (10, 20), (100, 200), (3.14, 2.86)]
    
    for num1, num2 in numbers_to_add:
        sum_numbers(num1, num2)

if __name__ == "__main__":
    main()