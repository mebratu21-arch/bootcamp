import json
import re
import os

class RestaurantMenuManager:
    def __init__(self, filename="menu.json"):
        self.filename = filename
        self.load_menu()
    
    def load_menu(self):
        """Load menu from JSON file or create default structure"""
        default_menu = {
            "regular_items": [
                {"name": "Margherita Pizza", "price": "12,99"},
                {"name": "Caesar Salad", "price": "8,50"},
                {"name": "Chocolate Cake", "price": "6,75"}
            ],
            "valentines_items": []
        }
        
        try:
            with open(self.filename, 'r') as file:
                self.menu = json.load(file)
        except FileNotFoundError:
            self.menu = default_menu
            self.save_menu()
    
    def save_menu(self):
        """Save menu to JSON file"""
        with open(self.filename, 'w') as file:
            json.dump(self.menu, file, indent=4)
    
    def validate_valentine_item(self, name, price):
        """Validate Valentine item according to rules"""
        # Rule 1: Each word begins with uppercase, first word starts with 'V'
        words = name.split()
        if not words[0][0].upper() == 'V':
            return False, "First word must start with 'V'"
        
        # Rule 2: Check capitalization of all words
        connection_words = {'of', 'and', 'the', 'or', 'with', 'in', 'on', 'at', 'to', 'for'}
        for i, word in enumerate(words):
            if i == 0:  # First word - must start with V and be capitalized
                if not word[0].isupper() or word[0] != 'V':
                    return False, "First word must start with capital 'V'"
            else:  # Other words
                if word.lower() in connection_words:
                    # Connection words should be lowercase
                    if not word.islower():
                        return False, f"Connection word '{word}' should be lowercase"
                else:
                    # Regular words should be capitalized
                    if not word[0].isupper():
                        return False, f"Word '{word}' should start with uppercase letter"
        
        # Rule 3: At least two 'e' characters (case insensitive)
        if len(re.findall(r'e', name, re.IGNORECASE)) < 2:
            return False, "Name must contain at least two 'e' characters"
        
        # Rule 4: No numbers in name
        if any(char.isdigit() for char in name):
            return False, "Name cannot contain numbers"
        
        # Rule 5: Price pattern XX,14
        price_pattern = r'^\d{2},14$'
        if not re.match(price_pattern, price):
            return False, "Price must match pattern: XX,14 (e.g., 25,14)"
        
        return True, "Validation successful"
    
    def add_valentine_item(self):
        """Add a new Valentine item to the menu"""
        print("\n" + "="*50)
        print("ADD VALENTINE'S DAY ITEM")
        print("="*50)
        
        print("\nRules for Valentine's Day items:")
        print("1. First word must start with capital 'V'")
        print("2. Each word begins with uppercase letter")
        print("3. Connection words (of, and, the, etc.) should be lowercase")
        print("4. Must contain at least two 'e' characters")
        print("5. No numbers allowed")
        print("6. Price must follow pattern: XX,14 (e.g., 25,14)")
        print("\nExample: 'Velvet Embrace of Eternal Love'")
        
        while True:
            name = input("\nEnter item name: ").strip()
            price = input("Enter price (XX,14 format): ").strip()
            
            is_valid, message = self.validate_valentine_item(name, price)
            
            if is_valid:
                # Add to menu
                self.menu["valentines_items"].append({
                    "name": name,
                    "price": price
                })
                self.save_menu()
                print(f"\n✅ SUCCESS: '{name}' added to Valentine's menu!")
                break
            else:
                print(f"\n❌ ERROR: {message}")
                retry = input("Would you like to try again? (y/n): ").lower()
                if retry != 'y':
                    break
    
    def display_heart(self):
        """Display a heart made of stars"""
        heart = [
            "    **     **    ",
            "   ****   ****   ",
            "  ****** ******  ",
            " *************** ",
            " *************** ",
            "  *************  ",
            "   ***********   ",
            "    *********    ",
            "     *******     ",
            "      *****      ",
            "       ***       ",
            "        *        "
        ]
        
        print("\n" + "💝" * 10)
        for line in heart:
            print(line)
        print("💝" * 10)
    
    def show_menu(self):
        """Display the complete menu with heart"""
        self.display_heart()
        
        print("\n" + "="*50)
        print("💖 VALENTINE'S DAY SPECIAL MENU 💖")
        print("="*50)
        
        if not self.menu["valentines_items"]:
            print("\nNo Valentine's items yet. Add some romantic dishes!")
        else:
            print("\n🌟 Valentine's Specials:")
            for i, item in enumerate(self.menu["valentines_items"], 1):
                print(f"  {i}. {item['name']} - €{item['price']}")
        
        print("\n🍽️  Regular Menu:")
        for i, item in enumerate(self.menu["regular_items"], 1):
            print(f"  {i}. {item['name']} - €{item['price']}")
        
        self.display_heart()
    
    def run(self):
        """Main program loop"""
        while True:
            print("\n" + "="*50)
            print("RESTAURANT MENU MANAGER")
            print("="*50)
            print("1. Show Menu")
            print("2. Add Valentine's Item")
            print("3. Exit")
            
            choice = input("\nEnter your choice (1-3): ").strip()
            
            if choice == '1':
                self.show_menu()
            elif choice == '2':
                self.add_valentine_item()
            elif choice == '3':
                print("Goodbye! 💝")
                break
            else:
                print("Invalid choice. Please try again.")

# Example usage
if __name__ == "__main__":
    manager = RestaurantMenuManager()
    manager.run()