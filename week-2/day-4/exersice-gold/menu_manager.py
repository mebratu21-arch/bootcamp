import json

class MenuManager:
    def __init__(self, filename="restaurant_menu.json"):
        self.filename = filename
        self.menu = self._load_menu()
    
    def _load_menu(self):
        """Load menu from JSON file"""
        try:
            with open(self.filename, 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            # Return default structure if file doesn't exist
            return {"items": []}
        except json.JSONDecodeError:
            print("Error: Invalid JSON format in menu file")
            return {"items": []}
    
    def add_item(self, name, price):
        """Add an item to the menu (without saving to file)"""
        # Validate price is a number
        try:
            price = float(price)
        except ValueError:
            raise ValueError("Price must be a number")
        
        # Check if item already exists
        for item in self.menu["items"]:
            if item["name"].lower() == name.lower():
                raise ValueError(f"Item '{name}' already exists in the menu")
        
        # Add new item
        new_item = {
            "name": name,
            "price": price
        }
        self.menu["items"].append(new_item)
        return True
    
    def remove_item(self, name):
        """Remove an item from the menu (without saving to file)"""
        for index, item in enumerate(self.menu["items"]):
            if item["name"].lower() == name.lower():
                del self.menu["items"][index]
                return True
        return False
    
    def save_to_file(self):
        """Save the current menu to the JSON file"""
        try:
            with open(self.filename, 'w') as file:
                json.dump(self.menu, file, indent=4)
            return True
        except Exception as e:
            print(f"Error saving to file: {e}")
            return False
    
    def get_menu(self):
        """Return the current menu"""
        return self.menu
    
    def display_menu(self):
        """Display the restaurant menu in a formatted way"""
        if not self.menu["items"]:
            print("The menu is currently empty.")
            return
        
        print("\n" + "="*40)
        print("🏪 RESTAURANT MENU")
        print("="*40)
        for i, item in enumerate(self.menu["items"], 1):
            print(f"{i}. {item['name']:20} ${item['price']:>6.2f}")
        print("="*40)