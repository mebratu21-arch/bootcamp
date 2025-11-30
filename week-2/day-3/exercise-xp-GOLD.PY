# COMPLETE SOLUTION - NO EXTERNAL PACKAGES NEEDED

print("=" * 50)
print("ALL EXERCISES - ")
print("=" * 50)
print()

# =============================================================================
# EXERCISE 1: Upcoming Holiday (FIXED - No holidays package)
# =============================================================================
from datetime import datetime, date

def upcoming_holiday():
    # Get today's date
    today = date.today()
    print(f"Today's date: {today.strftime('%Y-%m-%d')}")
    
    # Define common holidays
    year = today.year
    holidays_dict = {
        date(year, 1, 1): "New Year's Day",
        date(year, 2, 14): "Valentine's Day",
        date(year, 3, 17): "St. Patrick's Day",
        date(year, 7, 4): "Independence Day",
        date(year, 10, 31): "Halloween",
        date(year, 12, 25): "Christmas Day",
        date(year, 12, 31): "New Year's Eve",
    }
    
    # Add next year's holidays too
    holidays_dict[date(year + 1, 1, 1)] = "New Year's Day"
    
    # Find the next upcoming holiday
    next_holiday = None
    next_holiday_date = None
    min_days_diff = float('inf')
    
    for date_obj, name in sorted(holidays_dict.items()):
        if date_obj >= today:
            days_diff = (date_obj - today).days
            if days_diff < min_days_diff:
                min_days_diff = days_diff
                next_holiday = name
                next_holiday_date = date_obj
    
    if next_holiday:
        print(f"The next holiday is {next_holiday} in {min_days_diff} days.")
    else:
        print("No upcoming holidays found.")

print("Exercise 1: Upcoming Holiday")
print("-" * 30)
upcoming_holiday()
print()

# =============================================================================
# EXERCISE 2: How Old Are You On Jupiter?
# =============================================================================
def space_age(age_in_seconds):
    # Earth orbital period in seconds
    earth_year_seconds = 31557600
    
    # Orbital periods in Earth years
    planets = {
        'Earth': 1.0,
        'Mercury': 0.2408467,
        'Venus': 0.61519726,
        'Mars': 1.8808158,
        'Jupiter': 11.862615,
        'Saturn': 29.447498,
        'Uranus': 84.016846,
        'Neptune': 164.79132
    }
    
    # Calculate Earth age first
    earth_age = age_in_seconds / earth_year_seconds
    
    # Calculate ages for all planets
    ages = {}
    for planet, orbital_period in planets.items():
        ages[planet] = earth_age / orbital_period
    
    return ages

def display_space_age(age_in_seconds):
    ages = space_age(age_in_seconds)
    
    print(f"For someone who is {age_in_seconds:,} seconds old:")
    print("-" * 50)
    
    for planet, age in ages.items():
        print(f"{planet:8}: {age:.2f} years")

print("Exercise 2: How Old Are You On Jupiter?")
print("-" * 40)
display_space_age(1000000000)
print()

# =============================================================================
# EXERCISE 3: Regular Expression #1
# =============================================================================
import re

def return_numbers(string):
    # Extract all digits from the string
    numbers = re.findall(r'\d', string)
    
    # Join them into a single string
    result = ''.join(numbers)
    
    return result

print("Exercise 3: Regular Expression #1")
print("-" * 35)
test_string = 'k5k3q2g5z6x9bn'
result = return_numbers(test_string)
print(f"Input: '{test_string}'")
print(f"Output: '{result}'")
print()

# =============================================================================
# EXERCISE 4: Regular Expression #2
# =============================================================================
def validate_name():
    full_name = input("Please enter your full name (e.g., 'John Doe'): ").strip()
    
    # Pattern explanation:
    # ^[A-Z][a-z]* - First name starts with uppercase, followed by zero or more lowercase
    # \s - single space
    # [A-Z][a-z]*$ - Last name starts with uppercase, followed by zero or more lowercase
    pattern = r'^[A-Z][a-z]*\s[A-Z][a-z]*$'
    
    if re.match(pattern, full_name):
        print("✓ Valid name format!")
        return True
    else:
        print("✗ Invalid name format!")
        print("The name should:")
        print("- Contain only letters")
        print("- Contain only one space")
        print("- Have first letter of each name in uppercase")
        return False

print("Exercise 4: Regular Expression #2")
print("-" * 35)
validate_name()
print()

# =============================================================================
# EXERCISE 5: Python Password Generator
# =============================================================================
import random
import string
import secrets

def validate_password_length():
    """Get and validate password length from user"""
    while True:
        try:
            length = int(input("Enter password length (6-30): "))
            if 6 <= length <= 30:
                return length
            else:
                print("Please enter a number between 6 and 30.")
        except ValueError:
            print("Please enter a valid number.")

def generate_password(length):
    """Generate a secure password with required characteristics"""
    
    # Character sets
    digits = string.digits
    lower_case = string.ascii_lowercase
    upper_case = string.ascii_uppercase
    special_chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    all_chars = digits + lower_case + upper_case + special_chars
    
    # Ensure we have at least one of each required character type
    password = [
        secrets.choice(digits),
        secrets.choice(lower_case),
        secrets.choice(upper_case),
        secrets.choice(special_chars)
    ]
    
    # Fill the rest of the password length with random characters
    remaining_length = length - 4
    for _ in range(remaining_length):
        password.append(secrets.choice(all_chars))
    
    # Shuffle the password to avoid predictable patterns
    random.shuffle(password)
    
    return ''.join(password)

def test_password(password, expected_length):
    """Test if password meets all requirements"""
    has_digit = any(char.isdigit() for char in password)
    has_lower = any(char.islower() for char in password)
    has_upper = any(char.isupper() for char in password)
    has_special = any(not char.isalnum() for char in password)
    correct_length = len(password) == expected_length
    
    return all([has_digit, has_lower, has_upper, has_special, correct_length])

def run_tests():
    """Run tests to verify password generator works correctly"""
    print("Running password tests...")
    
    test_lengths = [6, 8, 12, 15, 20, 25, 30]
    all_passed = True
    
    for i, length in enumerate(test_lengths, 1):
        password = generate_password(length)
        is_valid = test_password(password, length)
        
        print(f"Test {i}: Length={length}, Valid={is_valid}")
        if not is_valid:
            print(f"  Failed password: {password}")
            all_passed = False
    
    if all_passed:
        print("All tests passed! ✓")
    return all_passed

def main():
    # Get password length from user
    length = validate_password_length()
    
    # Generate password
    password = generate_password(length)
    
    # Display the password
    print(f"\nYour generated password: {password}")
    print("\n🔒 Remember to keep your password in a safe place!")
    print("   Don't share it with anyone and consider using a password manager.")

print("Exercise 5: Python Password Generator")
print("-" * 40)
run_tests()
print("\n" + "="*50)
main()

print("\n" + "="*50)
print("ALL EXERCISES COMPLETED!")
print("="*50)