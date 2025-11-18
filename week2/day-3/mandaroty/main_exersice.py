"""
main_exercises.py - Complete solution for Exercises 1, 3, 4, 5, 6, 7
"""

import string
import random
from datetime import datetime, date, timedelta

# =============================================================================
# EXERCISE 1: Currencies Class with Dunder Methods
# =============================================================================

class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        return f"{self.amount} {self.currency}{'s' if self.amount != 1 else ''}"

    def __repr__(self):
        return f"{self.amount} {self.currency}{'s' if self.amount != 1 else ''}"

    def __int__(self):
        return self.amount

    def __add__(self, other):
        if isinstance(other, int):
            return self.amount + other
        elif isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            return self.amount + other.amount
        else:
            raise TypeError(f"Unsupported operand type(s) for +: 'Currency' and '{type(other).__name__}'")

    def __iadd__(self, other):
        if isinstance(other, int):
            self.amount += other
            return self
        elif isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            self.amount += other.amount
            return self
        else:
            raise TypeError(f"Unsupported operand type(s) for +=: 'Currency' and '{type(other).__name__}'")

def test_currency_exercise():
    print("\n" + "="*50)
    print("EXERCISE 1: Currency Class with Dunder Methods")
    print("="*50)
    
    # Create currency objects as per exercise example
    c1 = Currency('dollar', 5)
    c2 = Currency('dollar', 10)
    c3 = Currency('shekel', 1)
    c4 = Currency('shekel', 10)

    print("Testing all required operations:")
    print(f"1. print(c1) → {c1}")
    print(f"2. int(c1) → {int(c1)}")
    print(f"3. repr(c1) → {repr(c1)}")
    print(f"4. c1 + 5 → {c1 + 5}")
    print(f"5. c1 + c2 → {c1 + c2}")
    print(f"6. c1 after additions → {c1}")
    
    c1_temp = Currency('dollar', 5)  # Reset for += operations
    c1_temp += 5
    print(f"7. after c1 += 5 → {c1_temp}")
    
    c1_temp += c2
    print(f"8. after c1 += c2 → {c1_temp}")
    
    print("9. Testing error handling (c1 + c3):")
    try:
        result = c1 + c3
        print(f"   Result: {result}")
    except TypeError as e:
        print(f"   ✅ Correctly raised TypeError: {e}")

# =============================================================================
# EXERCISE 3: Random String using String Module
# =============================================================================

def generate_random_string(length=5):
    """Generate random string of uppercase and lowercase letters only"""
    all_letters = string.ascii_letters  # Contains both uppercase and lowercase
    random_string = ''.join(random.choice(all_letters) for _ in range(length))
    return random_string

def test_random_string_exercise():
    print("\n" + "="*50)
    print("EXERCISE 3: Random String Generation")
    print("="*50)
    
    print("Generating 3 random strings of length 5 (letters only):")
    for i in range(3):
        random_str = generate_random_string(5)
        print(f"  String {i+1}: {random_str}")
    
    # Additional demonstration
    print(f"\nCharacter set used: {string.ascii_letters}")
    print(f"Total letters available: {len(string.ascii_letters)}")

# =============================================================================
# EXERCISE 4: Current Date using Datetime Module
# =============================================================================

def display_current_date():
    """Display current date using datetime module"""
    current_date = date.today()
    current_datetime = datetime.now()
    
    print(f"Current date (basic): {current_date}")
    print(f"Formatted (YYYY-MM-DD): {current_date.strftime('%Y-%m-%d')}")
    print(f"Formatted (DD/MM/YYYY): {current_datetime.strftime('%d/%m/%Y')}")
    print(f"Full format: {current_datetime.strftime('%A, %B %d, %Y')}")

def test_current_date_exercise():
    print("\n" + "="*50)
    print("EXERCISE 4: Current Date")
    print("="*50)
    display_current_date()

# =============================================================================
# EXERCISE 5: Time Until January 1st
# =============================================================================

def time_until_january_first():
    """Calculate and display time until next January 1st"""
    now = datetime.now()
    next_year = now.year + 1
    january_first = datetime(next_year, 1, 1, 0, 0, 0)
    
    time_difference = january_first - now
    
    # Extract components
    days = time_difference.days
    hours, remainder = divmod(time_difference.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    
    print(f"Current datetime: {now.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Next January 1st: {january_first.strftime('%Y-%m-%d')}")
    print(f"Time remaining: {days} days, {hours} hours, {minutes} minutes, {seconds} seconds")
    print(f"Total seconds: {time_difference.total_seconds():,.0f}")

def test_time_until_january_exercise():
    print("\n" + "="*50)
    print("EXERCISE 5: Time Until January 1st")
    print("="*50)
    time_until_january_first()

# =============================================================================
# EXERCISE 6: Birthday and Minutes
# =============================================================================

def minutes_lived(birthdate_str, date_format="%Y-%m-%d"):
    """
    Calculate minutes lived based on birthdate
    
    Args:
        birthdate_str (str): Birthdate string
        date_format (str): Format of the birthdate string
    
    Returns:
        float: Minutes lived or None if error
    """
    try:
        # Parse birthdate using strptime
        birthdate = datetime.strptime(birthdate_str, date_format)
        now = datetime.now()
        
        # Calculate time difference and convert to minutes
        time_lived = now - birthdate
        minutes_lived = time_lived.total_seconds() / 60
        
        print(f"Birthdate: {birthdate.strftime('%B %d, %Y')}")
        print(f"Current time: {now.strftime('%B %d, %Y %H:%M:%S')}")
        print(f"Minutes lived: {minutes_lived:,.0f} minutes")
        print(f"Approximate years: {minutes_lived / (60 * 24 * 365.25):.2f} years")
        
        return minutes_lived
        
    except ValueError as e:
        print(f"Error parsing date: {e}")
        print(f"Please use format: {date_format} (e.g., 1990-05-15)")
        return None

def test_birthday_minutes_exercise():
    print("\n" + "="*50)
    print("EXERCISE 6: Birthday and Minutes")
    print("="*50)
    
    # Test with sample birthdate
    sample_birthdate = "1990-05-15"
    print("Testing with sample birthdate (1990-05-15):")
    minutes_lived(sample_birthdate)
    
    # Interactive test
    print("\n" + "-"*30)
    print("Interactive test - enter your birthdate:")
    user_input = input("Birthdate (YYYY-MM-DD, or press Enter to skip): ").strip()
    if user_input:
        minutes_lived(user_input)

# =============================================================================
# EXERCISE 7: Faker Module for User Data
# =============================================================================

def generate_fake_users(num_users=5):
    """
    Generate fake user data using Faker module
    
    Args:
        num_users (int): Number of users to generate
    
    Returns:
        list: List of dictionaries with user data
    """
    try:
        from faker import Faker
        fake = Faker()
        users = []
        
        for i in range(num_users):
            user = {
                'name': fake.name(),
                'address': fake.address().replace('\n', ', '),
                'language_code': fake.language_code()
            }
            users.append(user)
        
        return users
        
    except ImportError:
        print("❌ Faker module not installed. Please run: pip install faker")
        return None

def test_faker_exercise():
    print("\n" + "="*50)
    print("EXERCISE 7: Faker Module - Fake User Data")
    print("="*50)
    
    users = generate_fake_users(5)
    
    if users:
        print("Generated fake users (list of dictionaries):")
        for i, user in enumerate(users, 1):
            print(f"\nUser {i}:")
            print(f"  Name: {user['name']}")
            print(f"  Address: {user['address']}")
            print(f"  Language Code: {user['language_code']}")
        
        print(f"\n✅ Successfully generated {len(users)} fake users")
        print(f"Data structure type: {type(users)} (list of dictionaries)")
    else:
        print("Could not generate fake users. Faker module might not be installed.")
        print("To install: pip install faker")

# =============================================================================
# MAIN EXECUTION - RUN ALL EXERCISES
# =============================================================================

def main():
    """Run all exercises (1, 3-7)"""
    print("=" * 60)
    print("🌟 COMPLETE SOLUTION: EXERCISES 1, 3, 4, 5, 6, 7 🌟")
    print("=" * 60)
    
    # Run all exercises in sequence
    test_currency_exercise()           # Exercise 1
    test_random_string_exercise()      # Exercise 3
    test_current_date_exercise()       # Exercise 4
    test_time_until_january_exercise() # Exercise 5
    test_birthday_minutes_exercise()   # Exercise 6
    test_faker_exercise()              # Exercise 7
    
    print("\n" + "=" * 60)
    print("🎉 ALL EXERCISES COMPLETED SUCCESSFULLY! 🎉")
    print("=" * 60)

# Execute only if run directly
if __name__ == "__main__":
    main()