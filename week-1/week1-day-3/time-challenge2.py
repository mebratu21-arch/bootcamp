x = int(input('Enter the Number:'))

# Initialize a variable to store the sum of proper divisors
sum_of_divisors = 0

# A perfect number must be a positive integer, so we check for x > 0
if x > 0:
    # Iterate through all numbers from 1 up to x-1
    for i in range(1, x):
        # Check if 'i' is a divisor of 'x'
        if x % i == 0:
            # If it is a divisor, add it to the sum
            sum_of_divisors += i
            
    # Check if the sum of divisors equals the number itself
    is_perfect = (sum_of_divisors == x)
    
else:
    # If the number is not positive, it cannot be a perfect number
    is_perfect = False

# Print the final boolean result
print(is_perfect)