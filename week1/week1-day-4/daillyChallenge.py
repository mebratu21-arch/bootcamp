def create_menu():
    menu_dict = {
        "espresso": 7.0,
        "cappuccino": 8.0,
        "latte": 9.0
    }
    return menu_dict

def show_menu(menu_dict):
    if not menu_dict:
        print("Menu is empty.")
    else:
        print("\nCurrent Menu:")
        for item, price in menu_dict.items():
            print(f"{item.capitalize()}: ${price:.2f}")

def add_item(menu_dict):
    item = input("Enter the drink name: ").lower()
    if item in menu_dict:
        print(f"{item.capitalize()} is already in the menu with price ${menu_dict[item]:.2f}")
    else:
        price = float(input("Enter the price: "))
        menu_dict[item] = price
        print(f"{item.capitalize()} has been added to the menu with price ${price:.2f}")

def update_price(menu_dict):
    item = input("Enter the drink name to update: ").lower()
    if item in menu_dict:
        new_price = float(input("Enter the new price: "))
        menu_dict[item] = new_price
        print(f"{item.capitalize()} price has been updated to ${new_price:.2f}")
    else:
        print(f"{item.capitalize()} is not in the menu.")

def remove_item(menu_dict):
    item = input("Enter the drink name to remove: ").lower()
    if item in menu_dict:
        del menu_dict[item]
        print(f"{item.capitalize()} has been removed from the menu.")
    else:
        print(f"{item.capitalize()} is not in the menu.")

def print_menu(menu_dict):
    print("\nFull Menu:")
    for item, price in menu_dict.items():
        print(f"{item.capitalize()}: ${price:.2f}")

def main():
    menu_dict = create_menu()
    while True:
        print("\nCoffee Shop Menu Management")
        print("1. Show Menu")
        print("2. Add Item")
        print("3. Update Price")
        print("4. Remove Item")
        print("5. Print Menu")
        print("6. Exit")
        
        choice = input("Choose an option (1-6): ")
        
        if choice == '1':
            show_menu(menu_dict)
        elif choice == '2':
            add_item(menu_dict)
        elif choice == '3':
            update_price(menu_dict)
        elif choice == '4':
            remove_item(menu_dict)
        elif choice == '5':
            print_menu(menu_dict)
        elif choice == '6':
            print("Exiting the program.")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
