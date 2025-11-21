import random

class Game:
    def get_user_item(self):
        while True:
            user_input = input("Select an item (rock/paper/scissors): ").strip().lower()
            if user_input in ['rock', 'paper', 'scissors']:
                return user_input
            else:
                print("Invalid choice. Please enter 'rock', 'paper', or 'scissors'.")
    
    def get_computer_item(self):
        choices = ['rock', 'paper', 'scissors']
        return random.choice(choices)
    
    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"
        
        winning_combinations = {
            'rock': 'scissors',      # rock beats scissors
            'scissors': 'paper',     # scissors beat paper
            'paper': 'rock'          # paper beats rock
        }
        
        if winning_combinations[user_item] == computer_item:
            return "win"
        else:
            return "loss"
    
    def play(self):
        user_choice = self.get_user_item()
        computer_choice = self.get_computer_item()
        result = self.get_game_result(user_choice, computer_choice)
        
        print(f"You selected: {user_choice}")
        print(f"Computer selected: {computer_choice}")
        
        if result == "win":
            print("You win! ")
        elif result == "loss":
            print("You lose! ")
        else:
            print("It's a draw! ")
        
        return result