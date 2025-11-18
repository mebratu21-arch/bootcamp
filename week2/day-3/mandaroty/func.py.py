"""
func.py - Module for Exercise 2
Function to sum two numbers and print the result
"""

def sum_numbers(a, b):
    """
    Sum two numbers and print the result
    
    Args:
        a (int/float): First number
        b (int/float): Second number
    
    Returns:
        int/float: Sum of a and b
    """
    result = a + b
    print(f"The sum of {a} and {b} is: {result}")
    return result

def sum_numbers_with_validation(a, b):
    """
    Sum two numbers with type validation
    
    Args:
        a (int/float): First number
        b (int/float): Second number
    
    Returns:
        int/float: Sum of a and b
    
    Raises:
        TypeError: If inputs are not numbers
    """
    try:
        # Try to convert to float to handle both int and float
        num1 = float(a)
        num2 = float(b)
        
        result = num1 + num2
        print(f"✅ {num1} + {num2} = {result}")
        return result
        
    except (ValueError, TypeError):
        raise TypeError("Both arguments must be numbers")

# Test function when run directly
if __name__ == "__main__":
    print("Testing func.py directly:")
    sum_numbers(5, 3)
    sum_numbers(10.5, 2.5)
    print("func.py tests completed successfully!")