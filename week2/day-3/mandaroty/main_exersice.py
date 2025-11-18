"""
main_exercises.py - Combined solution for Exercises 1, 3, 4, 5, 6, 7
"""

import string
import random
from datetime import datetime, date, timedelta

# =============================================================================
# EXERCISE 1: Currencies Class
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

def test_currency():
    print("\n" + "="*50)
    print("EXERCISE 1: Currency Class")
    print("="*50)
    
    c1 = Currency('dollar', 5)
    c2 = Currency('dollar', 10)
    c3 = Currency('shekel', 1)
    c4 = Currency('shekel', 10)

    print("Initial setup:")
    print(f"c1 = {c1}")
    print(f"c2 = {c2}")
    print(f"c3 = {c3}")
    print(f"c4 = {c4}")

    print(f"\n__str__: {c1}")
    print(f"__int__: {int(c1)}")
    print(f"__repr__: {repr(c1)}")
    print(f"c1 + 5: {c1 + 5}")
    print(f"c1 + c2: {c1 + c2}")
    print(f"c1 after additions: {c1}")

    c1 += 5
    print(f"After c1 += 5: {c1}")

    c1 += c2
    print(f"After c1 += c2: {c1}")

    try:
        print(c1 + c3)
    except TypeError as e:
        print(f"Expected error: {e}")

# =============================================================================
# EXERCISE 3: Random String
# =============================================================================
def generate_random_string(length=5):
    """Generate random string using string module"""
    all_letters = string.ascii_letters
    return ''.join(random.choice(all_letters) for _ in range(length))

def test_random_string():
    print("\n" + "="*50)
    print("EXERCISE 3: Random String Generation")
    print("="*50)
    
    print("Generated random strings:")
    for i in range(5):
        random_str = generate_random_string()
        print(f"  {i+1}. {random_str}")

# =============================================================================
# EXERCISE 4: Current Date
# =============================================================================
def display_current_date():
    """Display current date in various formats"""
    current_date = date.today()
    current_datetime = datetime.now()
    
    print(f"Current date (YYYY-MM-DD): {current_date}")
    print(f"Current date (DD/MM/YYYY): {current_datetime.strftime('%d/%m/%Y')}")
    print(f"Current date (Month Day, Year): {current_datetime.strftime('%B %d, %Y')}")
    print(f"Current day of week: {current_datetime.strftime('%A')}")

def test_current_date():
    print("\n" + "="*50)
    print("EXERCISE 4: Current Date")
    print("="*50)
    display_current_date()

# =============================================================================
# EXERCISE 5: Time Until January 1st
# =============================================================================
def time_until_january_first():
    """Calculate time until next January 1st"""
    now = datetime.now()
    next_year = now.year + 1
    january_first = datetime(next_year, 1, 1)
    
    time_diff = january_first - now
    
    days = time_diff.days
    hours, remainder = divmod(time_diff.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    
    print(f"Current time: {now.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Next January 1st: {january_first.strftime('%Y-%m-%d')}")
    print(f"Time remaining: {days} days, {hours} hours, {minutes} minutes, {seconds} seconds")
    print(f"Total seconds: {time_diff.total_seconds():,.0f}")

def test_time_until_january():
    print("\n" + "="*50)
    print("EXERCISE 5: Time Until January 1st")
    print("="*50)
    time_until_january_first()

# =============================================================================
# EXERCISE 6: Birthday and Minutes
# =============================================================================
def minutes_lived(birthdate_str, date_format="%Y-%m-%d"):
    """Calculate minutes lived based on birthdate"""
    try:
        birthdate = datetime.strptime(birthdate_str, date_format)
        now = datetime.now()
        minutes = (now - birthdate).total_seconds() / 60
        
        print(f"Birthdate: {birthdate.strftime('%B %d, %Y')}")
        print(f"Current time: {now.strftime('%B %d, %Y %H:%M')}")
        print(f"Minutes lived: {minutes:,.0f} minutes")
        print(f"That's approximately {minutes / 525600:.1f} years!")
        
        return minutes
    except ValueError:
        print(f"Error: Please use the format {date_format} (e.g., 1990-05-15)")
        return None

def test_birthday_minutes():
    print("\n" + "="*50)
    print("EXERCISE 6: Birthday and Minutes")
    print("="*50)
    
    # Test with sample birthdate (change this to your birthdate)
    sample_birthdate = "1990-05-15"
    minutes_lived(sample_birthdate)
    
    print("\nTry your own birthdate!")
    user_birthdate = input("Enter your birthdate (YYYY-MM-DD): ").strip()
    if user_birthdate:
        minutes_lived(user_birthdate)

# =============================================================================
# EXERCISE 7: Faker Module
# =============================================================================
def generate_fake_users(num_users=5):
    """
    Generate fake user data using Faker module
    
    Note: This requires 'pip install faker' to work
    """
    try:
        from faker import Faker
        fake = Faker()
        users = []
        
        for i in range(num_users):
            user = {
                'id': i + 1,
                'name': fake.name(),
                'address': fake.address().replace('\n', ', '),
                'language_code': fake.language_code(),
                'email': fake.email(),
                'phone': fake.phone_number(),
                'job': fake.job()
            }
            users.append(user)
        
        return users
        
    except ImportError:
        print(" Faker module not installed. Run: pip install faker")
        return []

def display_users_table(users):
    """Display users in a formatted table"""
    print(f"\n{'ID':<3} {'Name':<20} {'Language':<8} {'Email':<25} {'Job':<20}")
    print("-" * 80)
    
    for user in users:
        job_short = user['job'][:20] + '...' if len(user['job']) > 20 else user['job']
        print(f"{user['id']:<3} {user['name']:<20} {user['language_code']:<8} "
              f"{user['email']:<25} {job_short:<20}")

def test_faker_module():
    print("\n" + "="*50)
    print("EXERCISE 7: Faker Module")
    print("="*50)
    
    users = generate_fake_users(5)
    
    if users:
        print("Generated fake users:")
        for user in users:
            print(f"\nUser #{user['id']}:")
            print(f"  Name: {user['name']}")
            print(f"  Address: {user['address']}")
            print(f"  Language: {user['language_code']}")
            print(f"  Email: {user['email']}")
            print(f"  Phone: {user['phone']}")
            print(f"  Job: {user['job']}")
        
        print("\nFormatted Table:")
        display_users_table(users)

# =============================================================================
# MAIN EXECUTION
# =============================================================================
def main():
    """Run all exercises"""
    print("=" * 60)
    print(" ALL PYTHON EXERCISES (Exercises 1, 3-7) 🌟")
    print("=" * 60)
    
    # Run all exercises
    test_currency()           # Exercise 1
    test_random_string()      # Exercise 3
    test_current_date()       # Exercise 4
    test_time_until_january() # Exercise 5
    test_birthday_minutes()   # Exercise 6
    test_faker_module()       # Exercise 7
    
    print("\n" + "=" * 60)
    print(" All exercises completed! 🎉")
    print("=" * 60)

if __name__ == "__main__":
    main()