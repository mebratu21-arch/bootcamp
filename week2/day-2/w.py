class Bank:
    def __init__(self, owner="", balance=0):
        self.owner = owner
        self.balance = balance

    def create(self):
        owner = input("Enter the name of owner  ")
        amount = float(input("Enter the amount to create account "))

        if amount > 0:
            self.owner = owner
            self.balance = amount
            print(f"This is {self.owner} and your balance is {amount}")
        else:
            print("You cannot create a new account ")
     
    def deposit(self):
        amount = float(input("enter the amount to your account  "))
        if amount > 0:
           self.balance += amount 
           print(f"your deposit amount{self.balance} ")
        else:
            print("you deposit is less the 0")   
# Create bank object
    def withdraw(self):
        amount = float(input("enter the amount to withdraw your account "))
        if 0 < amount < self.balance:
           self.balance -= amount 
           print(f"your remain balance amount{self.balance} ")
        else:
            print("you remain balance is less the 0 ")  
     
    def show(self):
        print("\n **********the account is********") 
        print(f"the account is{self.owner} and the balance {self.balance} ")     
   
    def menu(self):
        print("*"*17) 
        print("*"*17)
        print("****** 1 create *****")
        print("****** 2 deposit *****") 
        print("****** 3 withdraw *****") 
        print("****** 4 show *********") 
        print("****** 5 menu *********")       
        print("*"*17) 
        print("*"*17)
        
        choice = int(input("enter what you want to do"))
       
        
        if choice == "1":
            self.create()
        elif choice == "2":
             self.deposit()
        elif choice == "3":
             self.withdraw()
        elif choice == "4":
             self.show()
        elif choice == "5":
             self.menu()
        else:
            print("please try again")  
        if __name__ == "__main__":                
           menu = Bank()        
           menu.create()
           menu.deposit()
           menu.withdraw()
           menu.show()
         
if __name__ == "__main__":
    menu =Bank()
    menu.menu()      