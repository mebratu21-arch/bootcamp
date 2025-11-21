import random

def get_words_from_file(file_path):
    """
    Read words from a file and return them as a list.
    
    Args:
        file_path (str): Path to the file containing words
        
    Returns:
        list: List of words from the file
    """
    try:
        with open(file_path, 'r') as file:
            content = file.read()
            words = content.split()
            return words
    except FileNotFoundError:
        print(f" Error: File '{file_path}' not found.")
        return []
    except Exception as e:
        print(f" Error reading file: {e}")
        return []

def get_random_sentence(length, file_path="word_list.txt"):
    """
    Generate a random sentence of specified length.
    
    Args:
        length (int): Number of words in the sentence
        file_path (str): Path to the word list file
        
    Returns:
        str: Random sentence in lowercase
    """
    words = get_words_from_file(file_path)
    
    if not words:
        return "Could not generate sentence - no words available."
    
    # Select random words
    selected_words = []
    for _ in range(length):
        random_word = random.choice(words)
        selected_words.append(random_word)
    
    # Create sentence and convert to lowercase
    sentence = " ".join(selected_words).lower()
    return sentence

def create_sample_word_list():
    """Create a sample word list file if it doesn't exist"""
    sample_words = [
        "Python", "programming", "computer", "science", "learning",
        "development", "software", "engineering", "algorithm", "data",
        "structure", "function", "variable", "loop", "condition",
        "database", "network", "security", "web", "mobile",
        "application", "system", "design", "testing", "debugging",
        "framework", "library", "module", "package", "interface",
        "object", "class", "method", "attribute", "inheritance",
        "polymorphism", "encapsulation", "abstraction", "exception",
        "file", "input", "output", "string", "integer", "float",
        "boolean", "list", "dictionary", "tuple", "set"
    ]
    
    try:
        with open("word_list.txt", "w") as file:
            file.write("\n".join(sample_words))
        print(" Sample word list created: 'word_list.txt'")
    except Exception as e:
        print(f" Error creating sample word list: {e}")

def main():
    """Main function to handle user interaction"""
    print("RANDOM SENTENCE GENERATOR")
    print("=" * 40)
    print("This program generates random sentences from a word list.")
    print("You can specify the length of the sentence (2-20 words).")
    print("=" * 40)
    
    # Create sample word list if it doesn't exist
    try:
        with open("word_list.txt", "r"):
            pass
    except FileNotFoundError:
        print("📝 Creating sample word list...")
        create_sample_word_list()
    
    # Get user input for sentence length
    while True:
        try:
            user_input = input("\nEnter the desired sentence length (2-20): ").strip()
            
            # Validate input
            if not user_input:
                print(" Please enter a number.")
                continue
                
            length = int(user_input)
            
            if 2 <= length <= 20:
                # Generate and display random sentence
                sentence = get_random_sentence(length)
                print(f"\n Your random sentence ({length} words):")
                print(f"\"{sentence}\"")
                break
            else:
                print(" Please enter a number between 2 and 20.")
                
        except ValueError:
            print(" Invalid input. Please enter a valid number.")
        except KeyboardInterrupt:
            print("\n\n Program interrupted by user. Goodbye!")
            break
        except Exception as e:
            print(f" An unexpected error occurred: {e}")
            break
    
    # Ask if user wants to generate another sentence
    while True:
        try:
            another = input("\nWould you like to generate another sentence? (y/n): ").strip().lower()
            if another in ['y', 'yes']:
                main()  # Restart the program
                break
            elif another in ['n', 'no']:
                print(" Thank you for using the Random Sentence Generator!")
                break
            else:
                print(" Please enter 'y' for yes or 'n' for no.")
        except KeyboardInterrupt:
            print("\n Goodbye!")
            break

# Additional utility functions for enhanced functionality
def generate_multiple_sentences(num_sentences, length_range=(3, 8)):
    """Generate multiple random sentences"""
    sentences = []
    for i in range(num_sentences):
        length = random.randint(length_range[0], length_range[1])
        sentence = get_random_sentence(length)
        sentences.append((i + 1, length, sentence))
    return sentences

def display_multiple_sentences(sentences):
    """Display multiple sentences in a formatted way"""
    print(f"\n GENERATED {len(sentences)} RANDOM SENTENCES:")
    print("=" * 60)
    for num, length, sentence in sentences:
        print(f"{num:2d}. ({length} words): {sentence}")
    print("=" * 60)

# Run the program
if __name__ == "__main__":
    main()
    
    # Uncomment the following lines to test multiple sentence generation
    # print("\n" + "="*50)
    # print("BONUS: MULTIPLE SENTENCE GENERATION")
    # print("="*50)
    # sentences = generate_multiple_sentences(5, (3, 10))
    # display_multiple_sentences(sentences)
