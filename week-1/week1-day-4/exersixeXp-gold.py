###########1########
def get_age(year, month, day):
    # Hard-coded current date (you can update this)
    current_year = 2024
    current_month = 3
    
    age = current_year - year
    
    # Adjust age if birthday hasn't occurred this year yet
    if current_month < month or (current_month == month and day > 1):
        age -= 1
    
    return age

def can_retire(gender, date_of_birth):
    # Parse the date of birth
    year, month, day = map(int, date_of_birth.split('/'))
    
    # Get the age
    age = get_age(year, month, day)
    
    # Check retirement conditions
    if gender == 'm':
        return age >= 67
    elif gender == 'f':
        return age >= 62
    else:
        return False

# Main program
def main():
    # Get user input
    gender = input("Enter your gender (m/f): ").lower()
    date_of_birth = input("Enter your date of birth (yyyy/mm/dd): ")
    
    # Check if can retire
    if can_retire(gender, date_of_birth):
        print("Congratulations! You can retire.")
    else:
        print("Sorry, you cannot retire yet.")

# Test the function
if __name__ == "__main__":
    main()
    
###########2########
def calculate_sum(X):
    # Convert to string to easily create the pattern
    x_str = str(X)
    
    # Create the terms: X, XX, XXX, XXXX
    terms = [int(x_str * (i + 1)) for i in range(4)]
    
    # Return the sum
    return sum(terms)

# Test examples
print(calculate_sum(3))  # Output: 3702 (3 + 33 + 333 + 3333)
print(calculate_sum(1))  # Output: 1234 (1 + 11 + 111 + 1111)
print(calculate_sum(5))  # Output: 6170 (5 + 55 + 555 + 5555)

###########3########
import random

def throw_dice():
    """Simulate rolling a dice, returns integer between 1 and 6"""
    return random.randint(1, 6)

def throw_until_doubles():
    """Throw two dice until doubles are reached, return number of throws"""
    throws = 0
    
    while True:
        dice1 = throw_dice()
        dice2 = throw_dice()
        throws += 1
        
        # Print each throw (optional, for debugging)
        # print(f"Throw {throws}: ({dice1}, {dice2})")
        
        if dice1 == dice2:
            return throws

def main():
    """Main function to throw doubles 100 times and analyze results"""
    results = []  # List to store number of throws for each double
    
    # Throw until we get 100 doubles
    for i in range(100):
        throws_needed = throw_until_doubles()
        results.append(throws_needed)
    
    # Calculate statistics
    total_throws = sum(results)
    average_throws = total_throws / len(results)
    
    # Print results
    print(f"Total throws: {total_throws}")
    print(f"Average throws to reach doubles: {average_throws:.2f}")
    
    # Optional: Show some details about the distribution
    print(f"Minimum throws: {min(results)}")
    print(f"Maximum throws: {max(results)}")

# Run the main function
if __name__ == "__main__":
    main()
    
###########4########
