class Bank:
    def __init__(self,owner,balance = 0):
        self.owner = owner
        self.balance = balance
        
    def show(self):
        print(f"your name is {self.owner} and your balance is {self.balance}")
        
    def create(self,amount):
        owner = input("enter the owner name ")
        
        self.amount =amount
        amount =float(input("enter the amount you want to enter"))
        if amount > 0:
            self.balance = amount
            print("the owner name is {self.owner} and  the balance is {self.balance}")
            
        else:
            print("you cannot create a new account")
            
    def deposit(self):
        amount = float(input("enter the amount to deposit in your account  "))
        if amount >0:
            self.balance += amount
            print(f"you current deposit is {self.balance} ") 
            
        else:
            print("please try again")
            
    def withdraw(self):
        amount = float(input("enter the amount to deposit in your account  "))
        if amount >0:
            self.balance -= amount
            print(f"you current deposit is {self.balance} ") 
            
        else:
            print("please try again")                              
            
    def show(self):
        print("you are current acount is")     
        print(f"the owner is {self.owner}")
        print(f"the balance  is {self.balance}")   
        
        
b = Bank()
b.create()        