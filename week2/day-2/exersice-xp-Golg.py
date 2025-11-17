# Part I: Bank Account
class BankAccount:
    def __init__(self, initial_balance=0, username="", password=""):
        if initial_balance < 0:
            raise Exception("Initial balance cannot be negative")
        self.balance = initial_balance
        self.username = username
        self.password = password
        self.authenticated = False

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("User not authenticated. Please log in first.")
        if amount <= 0:
            raise Exception("Deposit amount must be positive")
        self.balance += amount
        print(f" Deposited ${amount}. New balance: ${self.balance}")

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("User not authenticated. Please log in first.")
        if amount <= 0:
            raise Exception("Withdrawal amount must be positive")
        if amount > self.balance:
            raise Exception("Insufficient funds")
        self.balance -= amount
        print(f"Withdrew ${amount}. New balance: ${self.balance}")

    def authenticate(self, username, password):
        if self.username == username and self.password == password:
            self.authenticated = True
            print(f" Authentication successful! Welcome {username}")
            return True
        else:
            self.authenticated = False
            print(" Authentication failed")
            return False

    def __str__(self):
        return f"BankAccount(username='{self.username}', balance=${self.balance}, authenticated={self.authenticated})"


# Part II: Minimum Balance Account
class MinimumBalanceAccount(BankAccount):
    def __init__(self, initial_balance=0, minimum_balance=0, username="", password=""):
        super().__init__(initial_balance, username, password)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("User not authenticated. Please log in first.")
        if amount <= 0:
            raise Exception("Withdrawal amount must be positive")
        if self.balance - amount < self.minimum_balance:
            raise Exception(f"Cannot withdraw ${amount}. Minimum balance of ${self.minimum_balance} must be maintained")
        self.balance -= amount
        print(f" Withdrew ${amount}. New balance: ${self.balance}")

    def __str__(self):
        return f"MinimumBalanceAccount(username='{self.username}', balance=${self.balance}, min_balance=${self.minimum_balance}, authenticated={self.authenticated})"


# Part IV: ATM Class
class ATM:
    def __init__(self, account_list, try_limit=2):
        # Validate account_list
        if not isinstance(account_list, list) or not all(isinstance(acc, (BankAccount, MinimumBalanceAccount)) for acc in account_list):
            raise Exception("account_list must be a list of BankAccount or MinimumBalanceAccount instances")
        
        # Validate try_limit
        if not isinstance(try_limit, int) or try_limit <= 0:
            print("⚠ Invalid try_limit. Setting to default value: 2")
            try_limit = 2
        
        self.account_list = account_list
        self.try_limit = try_limit
        self.current_tries = 0
        self.current_user = None
        
        print(" ATM initialized successfully!")

    def show_main_menu(self):
        while True:
            print("\n" + "="*40)
            print(" WELCOME TO THE ATM")
            print("="*40)
            print("1. Log in")
            print("2. Create new account")
            print("3. Exit")
            print("="*40)
            
            choice = input("Please select an option (1-3): ").strip()
            
            if choice == "1":
                username = input("Enter username: ").strip()
                password = input("Enter password: ").strip()
                self.log_in(username, password)
            elif choice == "2":
                self.create_new_account()
            elif choice == "3":
                print(" Thank you for using our ATM. Goodbye!")
                break
            else:
                print(" Invalid choice. Please select 1, 2, or 3.")

    def create_new_account(self):
        print("\n" + "="*40)
        print(" CREATE NEW ACCOUNT")
        print("="*40)
        
        # Get account type
        while True:
            acc_type = input("Choose account type (1=Regular, 2=Minimum Balance): ").strip()
            if acc_type in ["1", "2"]:
                break
            print(" Please enter 1 or 2")
        
        # Get username
        while True:
            username = input("Enter username: ").strip()
            if username:
                # Check if username already exists
                if any(acc.username == username for acc in self.account_list):
                    print(" Username already exists. Please choose another.")
                else:
                    break
            else:
                print(" Username cannot be empty")
        
        # Get password
        while True:
            password = input("Enter password: ").strip()
            if password:
                break
            else:
                print(" Password cannot be empty")
        
        # Get initial balance
        while True:
            try:
                balance = float(input("Enter initial balance: $"))
                if balance >= 0:
                    break
                else:
                    print(" Balance cannot be negative")
            except ValueError:
                print(" Please enter a valid number")
        
        # For minimum balance account, get minimum balance
        if acc_type == "2":
            while True:
                try:
                    min_balance = float(input("Enter minimum balance: $"))
                    if min_balance >= 0:
                        break
                    else:
                        print(" Minimum balance cannot be negative")
                except ValueError:
                    print(" Please enter a valid number")
        
        # Create the account
        if acc_type == "1":
            new_account = BankAccount(balance, username, password)
            print(f" Regular account created for {username} with ${balance}")
        else:
            new_account = MinimumBalanceAccount(balance, min_balance, username, password)
            print(f" Minimum balance account created for {username} with ${balance} (min: ${min_balance})")
        
        self.account_list.append(new_account)
        print("🎉 Account created successfully! You can now log in.")

    def log_in(self, username, password):
        # Reset current tries if this is a fresh attempt
        if self.current_tries >= self.try_limit:
            print(" Maximum login attempts reached. System shutdown.")
            exit()
        
        # Check all accounts for matching credentials
        for account in self.account_list:
            if account.authenticate(username, password):
                self.current_user = account
                self.current_tries = 0  # Reset tries on successful login
                self.show_account_menu(account)
                return
        
        # If no match found
        self.current_tries += 1
        remaining_tries = self.try_limit - self.current_tries
        print(f"❌ Login failed. {remaining_tries} attempt(s) remaining.")
        
        if self.current_tries >= self.try_limit:
            print(" Maximum login attempts reached. System shutdown.")
            exit()

    def show_account_menu(self, account):
        while True:
            print("\n" + "="*40)
            print(f"ACCOUNT MENU - Welcome {account.username}!")
            print("="*40)
            print(f"Current balance: ${account.balance}")
            if isinstance(account, MinimumBalanceAccount):
                print(f"Minimum balance: ${account.minimum_balance}")
            print("="*40)
            print("1. Deposit")
            print("2. Withdraw")
            print("3. View account info")
            print("4. Exit to main menu")
            print("="*40)
            
            choice = input("Please select an option (1-4): ").strip()
            
            if choice == "1":
                try:
                    amount = float(input("Enter deposit amount: $"))
                    account.deposit(amount)
                except Exception as e:
                    print(f" Error: {e}")
            elif choice == "2":
                try:
                    amount = float(input("Enter withdrawal amount: $"))
                    account.withdraw(amount)
                except Exception as e:
                    print(f" Error: {e}")
            elif choice == "3":
                print(f"\n Account Information:")
                print(f"Username: {account.username}")
                print(f"Balance: ${account.balance}")
                if isinstance(account, MinimumBalanceAccount):
                    print(f"Account Type: Minimum Balance Account")
                    print(f"Minimum Balance: ${account.minimum_balance}")
                else:
                    print(f"Account Type: Regular Bank Account")
            elif choice == "4":
                account.authenticated = False
                self.current_user = None
                print(" Logged out successfully.")
                break
            else:
                print(" Invalid choice. Please select 1, 2, 3, or 4.")


# Demonstration with user input
def run_demonstration():
    print("=== BANK ACCOUNT SYSTEM ===")
    
    # Start with some sample accounts or empty list
    accounts = []
    
    # Ask if user wants to create sample accounts
    create_samples = input("Do you want to create sample accounts? (yes/no): ").strip().lower()
    
    if create_samples in ['yes', 'y']:
        # Create some sample accounts
        sample1 = BankAccount(1000, "alice", "pass123")
        sample2 = BankAccount(500, "bob", "secret")
        sample3 = MinimumBalanceAccount(2000, 500, "charlie", "minbal")
        accounts.extend([sample1, sample2, sample3])
        print(" Sample accounts created!")
        print("Sample usernames: alice, bob, charlie")
    
    return accounts


if __name__ == "__main__":
    # Run the demonstration
    accounts = run_demonstration()
    
    # Start ATM system
    print("\n--- Starting ATM System ---")
    atm = ATM(accounts, try_limit=3)
    atm.show_main_menu()
    