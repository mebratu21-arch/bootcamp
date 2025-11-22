from game import Game

def get_user_menu_choice():
    print("=== Rock Paper Scissors Game ===")
    print("1. Play a new game")
    print("2. Show scores")
    print("3. Quit")
    
    while True:
        choice = input("Enter your choice (1-3): ").strip()
        if choice in ["1", "2", "3"]:
            return choice
        else:
            print("Invalid choice. Please enter 1, 2, or 3.")

def print_results(results):
    print("\n=== Game Results ===")
    print(f"Wins: {results.get('win', 0)}")
    print(f"Losses: {results.get('loss', 0)}")
    print(f"Draws: {results.get('draw', 0)}")
    print("Thank you for playing!")

def main():
    results = {"win": 0, "loss": 0, "draw": 0}
    
    while True:
        choice = get_user_menu_choice()
        
        if choice == "1":
            print("\n--- New Game ---")
            game = Game()
            result = game.play()
            results[result] = results.get(result, 0) + 1
            print("")
        
        elif choice == "2":
            print("\n--- Current Scores ---")
            print(f"Wins: {results['win']}")
            print(f"Losses: {results['loss']}")
            print(f"Draws: {results['draw']}")
            print("")
        
        elif choice == "3":
            print_results(results)
            break

if __name__ == "__main__":
    main()