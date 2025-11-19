import datetime

# ---------------- Base Class ----------------
class SystemBase:
    """Base class for shared file operations."""
    def __init__(self, users_file="users.txt", orders_file="orders.txt"):
        self.users_file = users_file
        self.orders_file = orders_file

    def write_to_file(self, filename, content):
        """Append content to a file."""
        with open(filename, "a") as f:
            f.write(content + "\n")

    def read_file(self, filename):
        """Read and return file content."""
        try:
            with open(filename, "r") as f:
                return f.read()
        except FileNotFoundError:
            return ""

# ---------------- User System ----------------
class UserSystem(SystemBase):
    """Handles user registration and login."""
    def register_user(self, username, password):
        self.write_to_file(self.users_file, f"{username},{password}")
        print(" User registered successfully!")

    def login(self, username, password):
        data = self.read_file(self.users_file)
        for line in data.splitlines():
            u, p = line.strip().split(",")
            if u == username and p == password:
                print(" Login successful!")
                return True
        print(" Login failed.")
        return False

# ---------------- Cafe System ----------------
class CafeSystem(SystemBase):
    """Handles menu management and orders."""
    def __init__(self):
        super().__init__()  # Inherit file handling from SystemBase
        self.menu = {"Coffee": 10, "Tea": 8, "Sandwich": 15, "Cake": 12}

    # CRUD for Menu
    def display_menu(self):
        print("\n--- Café Menu ---")
        for item, price in self.menu.items():
            print(f"{item}: ${price}")

    def add_item(self, item, price):
        self.menu[item] = price
        print(f" {item} added to menu.")

    def update_item(self, item, price):
        if item in self.menu:
            self.menu[item] = price
            print(f" {item} updated to ${price}.")
        else:
            print(" Item not found.")

    def delete_item(self, item):
        if item in self.menu:
            del self.menu[item]
            print(f" {item} removed from menu.")
        else:
            print(" Item not found.")

    # Orders
    def take_order(self):
        order = []
        total = 0
        while True:
            item = input("Enter item (or 'done' to finish): ").capitalize()
            if item == "Done":
                break
            elif item in self.menu:
                order.append(item)
                total += self.menu[item]
                print(f"{item} added. Current total: ${total}")
            else:
                print(" Item not available.")
        self.save_order(order, total)

    def save_order(self, order, total):
        self.write_to_file(self.orders_file,
                           f"{datetime.datetime.now()} - Order: {order} - Total: ${total}")
        print(" Order saved!")

    def view_orders(self):
        print("\n--- Order History ---")
        data = self.read_file(self.orders_file)
        print(data if data else "No orders found yet.")

# ---------------- Main Program ----------------
user_system = UserSystem()
cafe = CafeSystem()

print(" Welcome to Café System")
while True:
    print("\n1. Register\n2. Login\n3. Exit")
    choice = input("Choose: ")

    if choice == "1":
        u = input("Enter username: ")
        p = input("Enter password: ")
        user_system.register_user(u, p)

    elif choice == "2":
        u = input("Enter username: ")
        p = input("Enter password: ")
        if user_system.login(u, p):
            while True:
                print("\n1. View Menu\n2. Add Item\n3. Update Item\n4. Delete Item\n5. Place Order\n6. View Orders\n7. Logout")
                opt = input("Choose: ")

                if opt == "1":
                    cafe.display_menu()
                elif opt == "2":
                    item = input("Item name: ").capitalize()
                    price = int(input("Price: "))
                    cafe.add_item(item, price)
                elif opt == "3":
                    item = input("Item name: ").capitalize()
                    price = int(input("New price: "))
                    cafe.update_item(item, price)
                elif opt == "4":
                    item = input("Item name: ").capitalize()
                    cafe.delete_item(item)
                elif opt == "5":
                    cafe.display_menu()
                    cafe.take_order()
                elif opt == "6":
                    cafe.view_orders()
                elif opt == "7":
                    print(" Logged out.")
                    break
                else:
                    print(" Invalid choice.")
    elif choice == "3":
        print(" Goodbye!")
        break
    else:
        print(" Invalid choice.")
