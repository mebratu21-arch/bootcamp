# ✅ Debugged & Improved Banking System
# All fixes applied: transfer bug, better transaction handling, cleaner structure

import random
import datetime
from abc import ABC, abstractmethod

class Transaction:
    """Transaction class"""
    def __init__(self, amount, transaction_type, timestamp):
        self.amount = amount
        self.transaction_type = transaction_type
        self.timestamp = timestamp
        self.transaction_id = f"TXN{random.randint(100000, 999999)}"

    def __str__(self):
        return f"{self.timestamp.strftime('%Y-%m-%d %H:%M:%S')} - {self.transaction_type}: ${self.amount:.2f} (ID: {self.transaction_id})"

class Account(ABC):
    """Abstract base class for all account types"""

    def __init__(self, account_holder, initial_balance=0):
        self.account_number = ''.join([str(random.randint(0, 9)) for _ in range(10)])
        self.account_holder = account_holder
        self.balance = initial_balance
        self.transactions = []
        self.is_active = True
        self.created_date = datetime.datetime.now()

    def deposit(self, amount, t_type="Deposit"):
        if amount > 0:
            self.balance += amount
            self.transactions.append(Transaction(amount, t_type, datetime.datetime.now()))
            return True
        return False

    def withdraw(self, amount, t_type="Withdrawal"):
        if self.is_active and amount > 0 and self.balance >= amount:
            self.balance -= amount
            self.transactions.append(Transaction(amount, t_type, datetime.datetime.now()))
            return True
        return False

    def get_balance(self):
        return self.balance

    @abstractmethod
    def get_account_type(self):
        pass

class SavingsAccount(Account):
    def __init__(self, account_holder, initial_balance=0, interest_rate=2.5):
        super().__init__(account_holder, initial_balance)
        self.interest_rate = interest_rate

    def apply_interest(self):
        interest = self.balance * (self.interest_rate / 100) / 12
        self.balance += interest
        self.transactions.append(Transaction(interest, "Interest", datetime.datetime.now()))
        return interest

    def get_account_type(self):
        return "Savings Account"

class CurrentAccount(Account):
    def __init__(self, account_holder, initial_balance=0, overdraft_limit=1000):
        super().__init__(account_holder, initial_balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount, t_type="Withdrawal"):
        available = self.balance + self.overdraft_limit
        if self.is_active and amount > 0 and amount <= available:
            self.balance -= amount
            self.transactions.append(Transaction(amount, t_type, datetime.datetime.now()))
            return True
        return False

    def get_account_type(self):
        return "Current Account"

class FixedDepositAccount(Account):
    def __init__(self, account_holder, deposit_amount, tenure_months=12, interest_rate=6.5):
        super().__init__(account_holder, deposit_amount)
        self.tenure_months = tenure_months
        self.interest_rate = interest_rate
        self.maturity_date = self.created_date + datetime.timedelta(days=30 * tenure_months)
        self.is_matured = False

    def withdraw(self, amount, t_type="Withdrawal"):
        if datetime.datetime.now() >= self.maturity_date:
            self.is_matured = True
            return super().withdraw(amount, t_type)
        print("Cannot withdraw before maturity!")
        return False

    def get_account_type(self):
        return "Fixed Deposit Account"

class Customer:
    def __init__(self, name, email, phone, address):
        self.customer_id = f"CUST{random.randint(10000, 99999)}"
        self.name = name
        self.email = email
        self.phone = phone
        self.address = address
        self.accounts = []

    def add_account(self, account):
        self.accounts.append(account)

class Bank:
    def __init__(self, bank_name):
        self.bank_name = bank_name
        self.customers = {}
        self.accounts = {}

    def create_customer(self, name, email, phone, address):
        c = Customer(name, email, phone, address)
        self.customers[c.customer_id] = c
        return c

    def create_account(self, customer_id, acc_type, initial_deposit=0, **kwargs):
        if customer_id not in self.customers:
            print("Customer not found!")
            return None

        cust = self.customers[customer_id]

        if acc_type == "savings":
            acc = SavingsAccount(cust.name, initial_deposit, **kwargs)
        elif acc_type == "current":
            acc = CurrentAccount(cust.name, initial_deposit, **kwargs)
        elif acc_type == "fixed":
            acc = FixedDepositAccount(cust.name, initial_deposit, **kwargs)
        else:
            print("Invalid account type!")
            return None

        cust.add_account(acc)
        self.accounts[acc.account_number] = acc
        return acc

    def transfer_funds(self, from_acc_num, to_acc_num, amount):
        f = self.accounts.get(from_acc_num)
        t = self.accounts.get(to_acc_num)

        if not f or not t:
            print("Account not found!")
            return False

        if f.withdraw(amount, "Transfer Out"):
            t.deposit(amount, "Transfer In")
            print("Transfer Successful!")
            return True

        print("Transfer failed!")
        return False

# Demo with User Input
if __name__ == "__main__":
    bank = Bank("Python Bank")

    print("=== Create Customer ===")
    name = input("Enter name: ")
    email = input("Enter email: ")
    phone = input("Enter phone: ")
    address = input("Enter address: ")

    c = bank.create_customer(name, email, phone, address)

    print("Account Types: savings | current | fixed")
    acc_type = input("Enter account type: ").lower()
    initial_deposit = float(input("Initial deposit: "))

    if acc_type == "savings":
        acc = bank.create_account(c.customer_id, "savings", initial_deposit, interest_rate=3.0)
    elif acc_type == "current":
        acc = bank.create_account(c.customer_id, "current", initial_deposit, overdraft_limit=2000)
    elif acc_type == "fixed":
        acc = bank.create_account(c.customer_id, "fixed", initial_deposit, tenure_months=12, interest_rate=5.0)
    else:
        print("Invalid account type!")
        exit()

    print(f"Account created successfully! Number: {acc.account_number}")

    while True:
        print("=== MENU ===")
        print("1. Deposit")
        print("2. Withdraw")
        print("3. Balance")
        print("4. Exit")
        choice = input("Choose: ")

        if choice == "1":
            amt = float(input("Enter amount: "))
            acc.deposit(amt)
            print("Deposited.")

        elif choice == "2":
            amt = float(input("Enter amount: "))
            if acc.withdraw(amt):
                print("Withdrawn.")
            else:
                print("Failed: Not enough balance!")

        elif choice == "3":
            print(f"Balance: ${acc.get_balance()}")

        elif choice == "4":
            print("Goodbye!")
            break
        else:
            print("Invalid choice!")

