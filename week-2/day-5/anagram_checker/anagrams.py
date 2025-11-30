from anagram_checker import AnagramChecker

def display_menu():
    """
    Display the main menu to the user
    """
    print("\n" + "="*50)
    print("          ANAGRAM CHECKER")
    print("="*50)
    print("1. Input a word to find anagrams")
    print("2. Exit")
    print("="*50)

def get_user_input():
    """
    Get and validate user input
    """
    while True:
        try:
            user_input = input("\nEnter your choice (1 or 2): ").strip()
            
            if user_input == '1':
                return get_word_input()
            elif user_input == '2':
                return None
            else:
                print("Invalid choice! Please enter 1 or 2.")
        except KeyboardInterrupt:
            print("\n\nProgram interrupted by user. Goodbye!")
            return None
        except Exception as e:
            print(f"An error occurred: {e}")

def get_word_input():
    """
    Get and validate a word from the user
    """
    while True:
        try:
            word = input("\nEnter a word: ").strip()
            
            # Check if input is empty
            if not word:
                print("Error: Please enter a word.")
                continue
            
            # Check if multiple words were entered
            if len(word.split()) > 1:
                print("Error: Please enter only one word.")
                continue
            
            # Check if word contains only alphabetic characters
            if not word.isalpha():
                print("Error: Word must contain only alphabetic characters (a-z, A-Z).")
                continue
            
            return word.lower()
            
        except KeyboardInterrupt:
            print("\n\nReturning to main menu...")
            return None
        except Exception as e:
            print(f"An error occurred: {e}")

def main():
    """
    Main program loop
    """
    print("Loading word list...")
    checker = AnagramChecker()
    
    if not checker.word_list:
        print("\n" + "!"*50)
        print("CRITICAL: No words were loaded.")
        print("The program will continue but won't find any anagrams.")
        print("!"*50)
    
    while True:
        display_menu()
        user_choice = get_user_input()
        
        if user_choice is None:
            print("\nThank you for using Anagram Checker! Goodbye!")
            break
        
        # Process the word
        word = user_choice
        print(f"\n{'='*50}")
        print(f"YOUR WORD: \"{word.upper()}\"")
        print(f"{'='*50}")
        
        # Check if word list is available
        if not checker.word_list:
            print("❌ Cannot check word validity - word list not loaded.")
            continue
        
        # Check if word is valid
        if checker.is_valid_word(word):
            print("✓ This is a valid English word.")
            
            # Find anagrams
            anagrams = checker.get_anagrams(word)
            
            if anagrams:
                print(f"Anagrams for your word: {', '.join(anagrams)}")
            else:
                print("No anagrams found for this word.")
        else:
            print("✗ This is NOT a valid English word.")
            print("Please try again with a valid English word.")

if __name__ == "__main__":
    main()