# Café Management System - Running the main program
class CafeManagementSystem:
    def __init__(self):
        # Dictionary for menu items with prices
        self.menu = {
            "Coffee": 3.50,
            "Tea": 2.50,
            "Sandwich": 5.99,
            "Croissant": 3.25,
            "Cake": 4.75,
            "Smoothie": 4.50,
            "Salad": 7.25
        }
        
        # Tuple for café operating hours (opening, closing)
        self.operating_hours = ("06:00", "22:00")
        
        # Set for available tables
        self.available_tables = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
        
        # List for order history
        self.order_history = []
        
        # Dictionary for current orders (table_number: order_details)
        self.current_orders = {}
        
        # Set for staff members
        self.staff_members = {"Alice", "Bob", "Charlie", "Diana"}

    # ========== TUPLE FUNCTIONS ==========
    def get_operating_hours(self):
        """Return operating hours as a tuple"""
        return self.operating_hours
    
    def set_operating_hours(self, opening, closing):
        """Update operating hours using tuple"""
        self.operating_hours = (opening, closing)
        print(f"Operating hours updated: {opening} - {closing}")
    
    def is_cafe_open(self, current_time):
        """Check if café is open at given time using tuple comparison"""
        opening, closing = self.operating_hours
        return opening <= current_time <= closing

    # ========== SET FUNCTIONS ==========
    def add_staff_member(self, staff_name):
        """Add staff member using set"""
        if staff_name not in self.staff_members:
            self.staff_members.add(staff_name)
            print(f"Staff member '{staff_name}' added successfully!")
        else:
            print(f"Staff member '{staff_name}' already exists!")
    
    def remove_staff_member(self, staff_name):
        """Remove staff member using set"""
        if staff_name in self.staff_members:
            self.staff_members.remove(staff_name)
            print(f"Staff member '{staff_name}' removed successfully!")
        else:
            print(f"Staff member '{staff_name}' not found!")
    
    def assign_table(self, table_number):
        """Assign table to customer using set operations"""
        if table_number in self.available_tables:
            self.available_tables.remove(table_number)
            print(f"Table {table_number} assigned successfully!")
            return True
        else:
            print(f"Table {table_number} is not available!")
            return False
    
    def free_table(self, table_number):
        """Free up table using set operations"""
        self.available_tables.add(table_number)
        print(f"Table {table_number} is now available!")

    # ========== DICTIONARY FUNCTIONS ==========
    def display_menu(self):
        """Display menu using dictionary iteration"""
        print("\n=== CAFÉ MENU ===")
        for item, price in self.menu.items():
            print(f"{item}: ${price:.2f}")
    
    def add_menu_item(self, item_name, price):
        """Add new item to menu using dictionary"""
        self.menu[item_name] = price
        print(f"Menu item '{item_name}' added with price ${price:.2f}")
    
    def update_menu_price(self, item_name, new_price):
        """Update menu price using dictionary"""
        if item_name in self.menu:
            old_price = self.menu[item_name]
            self.menu[item_name] = new_price
            print(f"Price updated: {item_name} from ${old_price:.2f} to ${new_price:.2f}")
        else:
            print(f"Menu item '{item_name}' not found!")
    
    def get_item_price(self, item_name):
        """Get price of specific item using dictionary"""
        return self.menu.get(item_name, "Item not found!")

    # ========== LIST FUNCTIONS ==========
    def place_order(self, table_number, order_items):
        """Place order and add to list history"""
        if table_number not in self.available_tables:
            print(f"Cannot place order - Table {table_number} is not occupied!")
            return False
        
        order_total = sum(self.menu.get(item, 0) for item in order_items)
        order_details = {
            "table": table_number,
            "items": order_items,
            "total": order_total,
            "timestamp": self.get_current_time()
        }
        
        # Add to current orders dictionary
        self.current_orders[table_number] = order_details
        # Add to order history list
        self.order_history.append(order_details)
        
        print(f"Order placed for Table {table_number}: ${order_total:.2f}")
        return True
    
    def get_order_history(self):
        """Display order history using list iteration"""
        print("\n=== ORDER HISTORY ===")
        for i, order in enumerate(self.order_history, 1):
            print(f"{i}. Table {order['table']}: {order['items']} - ${order['total']:.2f} at {order['timestamp']}")
    
    def get_recent_orders(self, count=5):
        """Get recent orders using list slicing"""
        recent = self.order_history[-count:]
        print(f"\n=== LAST {count} ORDERS ===")
        for order in recent:
            print(f"Table {order['table']}: {order['items']} - ${order['total']:.2f}")

    # ========== COMBINED OPERATIONS ==========
    def complete_order(self, table_number, payment_amount):
        """Complete order using all data structures"""
        if table_number not in self.current_orders:
            print(f"No active order for Table {table_number}!")
            return False
        
        order = self.current_orders[table_number]
        total = order["total"]
        
        if payment_amount >= total:
            change = payment_amount - total
            print(f"Payment successful! Change: ${change:.2f}")
            
            # Remove from current orders (dictionary)
            del self.current_orders[table_number]
            
            # Free up table (set)
            self.free_table(table_number)
            
            return True
        else:
            print(f"Insufficient payment! Total: ${total:.2f}, Paid: ${payment_amount:.2f}")
            return False
    
    def get_cafe_status(self):
        """Display complete café status using all data structures"""
        print("\n" + "="*50)
        print("CAFÉ STATUS REPORT")
        print("="*50)
        
        # Tuple info
        opening, closing = self.operating_hours
        print(f"Operating Hours: {opening} - {closing}")
        
        # Set info
        print(f"Available Tables: {sorted(self.available_tables)}")
        print(f"Occupied Tables: {sorted(set(range(1, 11)) - self.available_tables)}")
        print(f"Staff Members: {sorted(self.staff_members)}")
        
        # Dictionary info
        print(f"Menu Items: {len(self.menu)}")
        print(f"Current Active Orders: {len(self.current_orders)}")
        
        # List info
        print(f"Total Orders Today: {len(self.order_history)}")
        
        if self.current_orders:
            print("\nActive Orders:")
            for table, order in self.current_orders.items():
                print(f"  Table {table}: {order['items']} - ${order['total']:.2f}")

    # ========== UTILITY FUNCTIONS ==========
    def get_current_time(self):
        """Simulate current time (for demo purposes)"""
        from datetime import datetime
        return datetime.now().strftime("%H:%M")
    
    def calculate_daily_revenue(self):
        """Calculate total revenue from order history list"""
        total_revenue = sum(order["total"] for order in self.order_history)
        return total_revenue
    
    def get_popular_items(self):
        """Get most popular menu items using dictionary and list operations"""
        item_count = {}
        for order in self.order_history:
            for item in order["items"]:
                item_count[item] = item_count.get(item, 0) + 1
        
        # Convert to list of tuples and sort
        popular_items = sorted(item_count.items(), key=lambda x: x[1], reverse=True)
        return popular_items[:3]  # Return top 3

# ========== MAIN PROGRAM ==========
def main():
    cafe = CafeManagementSystem()
    
    while True:
        print("\n" + "="*50)
        print("CAFÉ MANAGEMENT SYSTEM")
        print("="*50)
        print("1. Display Menu")
        print("2. Manage Tables")
        print("3. Place Order")
        print("4. Complete Order")
        print("5. Manage Staff")
        print("6. View Reports")
        print("7. Café Status")
        print("8. Exit")
        
        choice = input("\nEnter your choice (1-8): ")
        
        if choice == "1":
            # Menu Management
            print("\n--- MENU MANAGEMENT ---")
            cafe.display_menu()
            
            sub_choice = input("\n1. Add item | 2. Update price | 3. Back: ")
            if sub_choice == "1":
                item = input("Enter item name: ")
                price = float(input("Enter price: "))
                cafe.add_menu_item(item, price)
            elif sub_choice == "2":
                item = input("Enter item name: ")
                price = float(input("Enter new price: "))
                cafe.update_menu_price(item, price)
        
        elif choice == "2":
            # Table Management
            print("\n--- TABLE MANAGEMENT ---")
            print(f"Available tables: {sorted(cafe.available_tables)}")
            
            sub_choice = input("\n1. Assign table | 2. Free table | 3. Back: ")
            if sub_choice == "1":
                table = int(input("Enter table number: "))
                cafe.assign_table(table)
            elif sub_choice == "2":
                table = int(input("Enter table number: "))
                cafe.free_table(table)
        
        elif choice == "3":
            # Place Order
            print("\n--- PLACE ORDER ---")
            table = int(input("Enter table number: "))
            cafe.display_menu()
            
            items_input = input("Enter items (comma-separated): ")
            order_items = [item.strip() for item in items_input.split(",")]
            
            if cafe.assign_table(table):
                cafe.place_order(table, order_items)
        
        elif choice == "4":
            # Complete Order
            print("\n--- COMPLETE ORDER ---")
            table = int(input("Enter table number: "))
            payment = float(input("Enter payment amount: "))
            cafe.complete_order(table, payment)
        
        elif choice == "5":
            # Staff Management
            print("\n--- STAFF MANAGEMENT ---")
            print(f"Current staff: {sorted(cafe.staff_members)}")
            
            sub_choice = input("\n1. Add staff | 2. Remove staff | 3. Back: ")
            if sub_choice == "1":
                staff = input("Enter staff name: ")
                cafe.add_staff_member(staff)
            elif sub_choice == "2":
                staff = input("Enter staff name: ")
                cafe.remove_staff_member(staff)
        
        elif choice == "6":
            # Reports
            print("\n--- REPORTS ---")
            print(f"1. Order History")
            print(f"2. Recent Orders")
            print(f"3. Daily Revenue")
            print(f"4. Popular Items")
            
            sub_choice = input("\nEnter choice (1-4): ")
            if sub_choice == "1":
                cafe.get_order_history()
            elif sub_choice == "2":
                cafe.get_recent_orders()
            elif sub_choice == "3":
                revenue = cafe.calculate_daily_revenue()
                print(f"Daily Revenue: ${revenue:.2f}")
            elif sub_choice == "4":
                popular = cafe.get_popular_items()
                print("Most Popular Items:")
                for item, count in popular:
                    print(f"  {item}: {count} orders")
        
        elif choice == "7":
            # Café Status
            cafe.get_cafe_status()
        
        elif choice == "8":
            print("Thank you for using Café Management System!")
            break
        
        else:
            print("Invalid choice! Please try again.")

# Run the program
if __name__ == "__main__":
    main()