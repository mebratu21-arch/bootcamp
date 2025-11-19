import os

if os.path.exists("mebre.txt"):
    print("the file is exit")
else:
    print("you cannot get it")    
with open("mebre.txt" ,"w") as file:
    x= file.write("how are you mebratu")
    print(x)
    
with open("mebre.txt", "a") as file:
    x = file.write("this is addition")
    print(x)
    
with open("mebre.txt","r") as file:
    x = file.read()
    print(x)        
    
with open("mebre.txt","r") as file:
    x = file.readline()
    print(x)     
    
if os.path.exists("mebre.txt"):
    os.path.remove("mebre.txt")
    print("the file is delete")
else:
    print("the file deosnot exit")        