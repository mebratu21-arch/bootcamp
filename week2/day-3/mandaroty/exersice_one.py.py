"""
exercise_one.py - Main file for Exercise 2
Imports and uses functions from func.py
"""

# Import the function from func.py
from func import sum_numbers, sum_numbers_with_validation

def main():
    print("=" * 50)
    print("EXERCISE 2: Import Demonstration")
    print("=" * 50)
    
    # Test the imported function
    print("Testing imported sum_numbers function:")
    sum_numbers(15, 25)
    sum_numbers(30, 40)
    
    # Test the validation function
    print("\nTesting sum_numbers_with_validation:")
    try:
        sum_numbers_with_validation(10, 20)
        sum_numbers_with_validation(5.5, 4.5)
        
        # This will raise an error - testing error handling
        sum_numbers_with_validation("abc", 10)
        
    except TypeError as e:
        print(f" Expected error: {e}")
    
    # Demonstrate multiple operations
    print("\nMultiple operations demonstration:")
    numbers_to_add = [(1, 2), (10, 20), (100, 200), (3.14, 2.86)]
    
    for i, (num1, num2) in enumerate(numbers_to_add, 1):
        print(f"Operation {i}: ", end="")
        sum_numbers(num1, num2)
    
    print("\n Exercise 2 completed successfully!")

if __name__ == "__main__":
    main()