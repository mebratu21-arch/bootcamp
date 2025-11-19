from menu_manager import MenuManager

class MenuEditor:
    def __init__(self):
        self.manager = None
    
    def load_manager(self):
        """Create a new MenuManager instance"""
        self.manager = MenuManager()
        print("✅ Menu manager loaded successfully!")
    
    def show_user_menu(self):
        """Display the program menu and handle user input"""
        if not self.manager:
            self.load_manager()
        
        while True:
            print("\n" + "="*50)
            print("📋 RESTAURANT MENU MANAGER")
            print("="*50)
            print("1. View Restaurant Menu")
            print("2. Add Item to Menu")
            print("3. Remove Item from Menu")
            print("4. Save and Exit")
            print("="*50)
            
            choice = input("Enter your choice (1-4): ").strip()
            
            if choice == '1':
                self.show_restaurant_menu()
            elif choice == '2':
                self.add_item_to_menu()
            elif choice == '3':
                self.remove_item_from_menu()
            elif choice == '4':
                self.exit_program()
                break
            else:
                print("❌ Invalid choice. Please try again.")
    
    def add_item_to_menu(self):
        """Add an item to the menu"""
        print("\n" + "-"*30)
        print("➕ ADD NEW ITEM")
        print("-"*30)
        
        name = input("Enter item name: ").strip()
        if not name:
            print("❌ Item name cannot be empty.")
            return
        
        price = input("Enter item price: ").strip()
        
        try:
            success = self.manager.add_item(name, price)
            if success:
                print(f"✅ '{name}' was added successfully!")
        except ValueError as e:
            print(f"❌ Error: {e}")
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
    
    def remove_item_from_menu(self):
        """Remove an item from the menu"""
        print("\n" + "-"*30)
        print("🗑️  REMOVE ITEM")
        print("-"*30)
        
        if not self.manager.menu["items"]:
            print("❌ The menu is empty. Nothing to remove.")
            return
        
        self.show_restaurant_menu()
        name = input("\nEnter the name of the item to remove: ").strip()
        
        if self.manager.remove_item(name):
            print(f"✅ '{name}' was removed successfully!")
        else:
            print(f"❌ Error: '{name}' was not found in the menu.")
    
    def show_restaurant_menu(self):
        """Display the restaurant menu"""
        self.manager.display_menu()
    
    def exit_program(self):
        """Save menu to file and exit"""
        if self.manager.save_to_file():
            print("✅ Menu saved successfully!")
            print("👋 Thank you for using Restaurant Menu Manager!")
        else:
            print("❌ Error saving menu to file!")

# Main execution
if __name__ == "__main__":
    editor = MenuEditor()
    editor.show_user_menu()