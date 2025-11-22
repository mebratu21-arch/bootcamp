import random

class Game:
    def __init__(self):
        self.user_score = 0
        self.computer_score = 0
        self.draws = 0

    def get_user_item(self):
        while True:
            user_input = input("Select an item (rock/paper/scissors): ").strip().lower()
            if user_input in ['rock', 'paper', 'scissors']:
                return user_input
            print("Invalid choice. Please enter 'rock', 'paper', or 'scissors'.")

    def get_computer_item(self):
        return random.choice(['rock', 'paper', 'scissors'])

    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"

        winning_combinations = {
            'rock': 'scissors',
            'scissors': 'paper',
            'paper': 'rock'
        }

        if winning_combinations[user_item] == computer_item:
            return "win"
        return "loss"

    def play_round(self):
        user_choice = self.get_user_item()
        computer_choice = self.get_computer_item()
        result = self.get_game_result(user_choice, computer_choice)

        print(f"You selected: {user_choice}")
        print(f"Computer selected: {computer_choice}")

        if result == "win":
            print("You win! ")
            self.user_score += 1
        elif result == "loss":
            print("You lose! ")
            self.computer_score += 1
        else:
            print("It's a draw! ")
            self.draws += 1

        return result

    def print_scoreboard(self):
        print("\n===== SCOREBOARD =====")
        print(f"Wins: {self.user_score}")
        print(f"Losses: {self.computer_score}")
        print(f"Draws: {self.draws}")
        print("======================\n")


def get_user_menu_choice():
    while True:
        print("\n=== Rock Paper Scissors Game ===")
        print("1. Play a new game")
        print("2. Show scores")
        print("3. Quit")

        choice = input("Enter your choice (1-3): ").strip()

        if choice in ['1', '2', '3']:
            return choice
        print("Invalid choice. Please enter 1, 2, or 3.")


def print_results(game):
    print("\n=== Final Results ===")
    print(f"Wins: {game.user_score}")
    print(f"Losses: {game.computer_score}")
    print(f"Draws: {game.draws}")
    print("\nThank you for playing! ")


def main():
    game = Game()

    while True:
        choice = get_user_menu_choice()

        if choice == '1':
            game.play_round()
        elif choice == '2':
            game.print_scoreboard()
        elif choice == '3':
            print_results(game)
            break


if __name__ == "__main__":
    main()