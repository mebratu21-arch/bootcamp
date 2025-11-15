class TicTacToe:
    def __init__(self):
        """Initialize the game board and game state"""
        # Create a 3x3 board filled with empty spaces
        self.board = [[' ' for _ in range(3)] for _ in range(3)]
        # Player 'X' always starts first
        self.current_player = 'X'
        # Track if the game has ended
        self.game_over = False
        # Track the winner (None if no winner yet)
        self.winner = None

    def print_board(self):
        """Print the current state of the board in a user-friendly format"""
        print("\n   |   |   ")  # Top border
        for i in range(3):
            # Print each row with the current marks
            print(f" {self.board[i][0]} | {self.board[i][1]} | {self.board[i][2]} ")
            if i < 2:
                # Print horizontal dividers between rows
                print("___|___|___")
            else:
                # Print bottom border
                print("   |   |   ")
        print()  # Extra line for readability

    def make_move(self, row, col):
        """
        Attempt to make a move at the specified position
        Returns True if move was successful, False otherwise
        """
        # Step 1: Check if game is already over
        if self.game_over:
            print("Game is already over!")
            return False
            
        # Step 2: Validate the input coordinates
        if row < 0 or row > 2 or col < 0 or col > 2:
            print("Invalid move! Row and column must be between 0 and 2.")
            return False
            
        # Step 3: Check if the position is already occupied
        if self.board[row][col] != ' ':
            print("That position is already taken!")
            return False
            
        # Step 4: Place the current player's mark on the board
        self.board[row][col] = self.current_player
        
        # Step 5: Check if this move resulted in a win
        if self.check_win():
            self.game_over = True
            self.winner = self.current_player
            print(f"Player {self.current_player} wins!")
            return True
        
        # Step 6: Check if the game is a tie (no spaces left and no winner)
        elif self.check_tie():
            self.game_over = True
            print("It's a tie!")
            return True
        
        # Step 7: If game continues, switch to the other player
        else:
            # Switch from 'X' to 'O' or from 'O' to 'X'
            self.current_player = 'O' if self.current_player == 'X' else 'X'
            return True

    def check_win(self):
        """Check if the current player has won the game"""
        # Check all 3 rows for a win
        for i in range(3):
            if (self.board[i][0] == self.current_player and 
                self.board[i][1] == self.current_player and 
                self.board[i][2] == self.current_player):
                return True
                
        # Check all 3 columns for a win
        for i in range(3):
            if (self.board[0][i] == self.current_player and 
                self.board[1][i] == self.current_player and 
                self.board[2][i] == self.current_player):
                return True
                
        # Check the main diagonal (top-left to bottom-right)
        if (self.board[0][0] == self.current_player and 
            self.board[1][1] == self.current_player and 
            self.board[2][2] == self.current_player):
            return True
            
        # Check the other diagonal (top-right to bottom-left)
        if (self.board[0][2] == self.current_player and 
            self.board[1][1] == self.current_player and 
            self.board[2][0] == self.current_player):
            return True
            
        # No winning condition found
        return False

    def check_tie(self):
        """Check if the game is a tie (board full with no winner)"""
        # Check every cell - if any cell is empty, it's not a tie yet
        for row in self.board:
            for cell in row:
                if cell == ' ':
                    return False
        # All cells are filled and no winner = tie game
        return True

    def reset_game(self):
        """Reset the game to start a new match"""
        self.board = [[' ' for _ in range(3)] for _ in range(3)]
        self.current_player = 'X'
        self.game_over = False
        self.winner = None
        print("Game has been reset! Ready for a new game.")

    def play(self):
        """Main game loop - handles the complete gameplay"""
        print("=== Welcome to Tic Tac Toe! ===")
        print("Players will take turns. Enter row and column (0-2) separated by space.")
        print("Example: '1 1' for the center position.")
        
        # Game loop continues until players decide to quit
        while True:
            # Display current board state
            self.print_board()
            
            # If game is over, ask if players want to play again
            if self.game_over:
                play_again = input("Would you like to play again? (y/n): ").lower()
                if play_again == 'y':
                    self.reset_game()
                    continue
                else:
                    print("Thanks for playing!")
                    break
            
            # Display whose turn it is
            print(f"Player {self.current_player}'s turn")
            
            try:
                # Get player input
                move = input("Enter your move (row column): ").split()
                
                # Validate input format
                if len(move) != 2:
                    print("Please enter exactly two numbers separated by space!")
                    continue
                
                # Convert input to integers
                row, col = int(move[0]), int(move[1])
                
                # Attempt to make the move
                if not self.make_move(row, col):
                    print("Please try a different move.")
                    
            except ValueError:
                print("Please enter valid numbers!")
            except KeyboardInterrupt:
                print("\nGame interrupted. Thanks for playing!")
                break
            except Exception as e:
                print(f"An error occurred: {e}")

# This block runs when the script is executed directly
if __name__ == "__main__":
    # Create a game instance and start playing
    game = TicTacToe()
    game.play()
