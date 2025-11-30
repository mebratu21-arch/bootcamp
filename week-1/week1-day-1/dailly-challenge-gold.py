

# Step 1: Ask the user for their birthdate
# Format: DD/MM/YYYY (example: 14/11/1972)
birthdate_str = input("Enter your birthdate (DD/MM/YYYY): ")

# Step 2: Split the string into day, month, year
day, month, year = birthdate_str.split("/")
year = int(year)  # convert year to a number

# Step 3: Get today's date
from datetime import datetime
today = datetime.today()

# Step 4: Calculate age
age = today.year - year
# If birthday hasn't happened yet this year, subtract 1
if (today.month, today.day) < (int(month), int(day)):
    age -= 1

# Step 5: Find last digit of age (for candles)
candles = age % 10
candle_str = "i" * candles  # make candles using "i"

# Step 6: Draw the cake
cake = f"""
       ___{candle_str}___
      |:H:a:p:p:y:|
    __|___________|__
   |^^^^^^^^^^^^^^^^^|
   |:B:i:r:t:h:d:a:y:|
   |                 |
   ~~~~~~~~~~~~~~~~~~~
"""

# Step 7: Check if birth year is a leap year
def is_leap_year(year):
    if year % 400 == 0:
        return True
    if year % 100 == 0:
        return False
    if year % 4 == 0:
        return True
    return False

# Step 8: Print cake(s)
if is_leap_year(year):
    print(cake)
    print(cake)  # print two cakes if leap year
else:
    print(cake)
