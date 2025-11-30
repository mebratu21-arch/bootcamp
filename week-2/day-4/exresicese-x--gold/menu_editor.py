import json
import os

class MenuManager:
    def __init__(self):
        self.menu_file = 'restaurant_menu.json'
        self.menu = self._load_menu()
    
    def _load_menu(self):
        try:
            if os.path.exists(self.menu_file):
                with open(self.menu_file, 'r') as file:
                    return json.load(file)
            else:
                default_menu = {"items": []}
                with open(self.menu_file, 'w') as file:
                    json.dump(default_menu, file, indent=4)
                return default_menu
        except Exception as e:
            print(f"Error: {e}")
            return {"items": []}
    
    def add_item(self, name, price):
        self.menu["items"].append({"name": name, "price": price})
    
    def remove_item(self, name):
        for i, item in enumerate(self.menu["items"]):
            if item["name"].lower() == name.lower():
                del self.menu["items"][i]
                return True
        return False
    
    def save_to_file(self):
        with open(self.menu_file, 'w') as file:
            json.dump(self.menu, file, indent=4)
    
    def get_menu(self):
        return self.menu

def main():
    manager = MenuManager()
    
    while True:
        print("\n" + "="*30)
        print("    RESTAURANT MENU MANAGER")
        print("="*30)
        print("(a) Add an item to the menu")
        print("(d) Remove an item from the menu")
        print("(v) View the restaurant menu")
        print("(x) Exit and save changes")
        
        choice = input("\nEnter your choice: ").lower().strip()
        
        if choice == 'a':
            name = input("Enter item name: ").strip()
            try:
                price = float(input("Enter item price: "))
                manager.add_item(name, price)
                print(f"'{name}' added successfully!")
            except ValueError:
                print("Invalid price!")
                
        elif choice == 'd':
            name = input("Enter item name to remove: ").strip()
            if manager.remove_item(name):
                print(f"'{name}' removed successfully!")
            else:
                print(f"'{name}' not found!")
                
        elif choice == 'v':
            menu = manager.get_menu()
            print("\nRESTAURANT MENU:")
            for item in menu["items"]:
                print(f"- {item['name']}: ${item['price']:.2f}")
                
        elif choice == 'x':
            manager.save_to_file()
            print("Menu saved. Goodbye!")
            break
            
        else:
            print("Invalid choice!")

if __name__ == "__main__":
    main()and