# Challenge 1: Sorting Comma-Separated Words
# Step 1: Get Input
print("=== Challenge 1: Sorting Words ===")
input_string = input("Enter words separated by commas: ")

# Step 2: Split the String
words_list = input_string.split(',')

# Step 3: Sort the List
words_list.sort()

# Step 4: Join the Sorted List
result_string = ','.join(words_list)

# Step 5: Print the Result
print("Sorted words:", result_string)

# Challenge 2: Finding the Longest Word
# Step 1: Define the Function
def longest_word(sentence):
    # Step 2: Split the Sentence into Words
    words = sentence.split()
    
    # Step 3: Initialize Variables
    longest = ""
    max_length = 0
    
    # Step 4: Iterate Through the Words
    for word in words:
        # Step 5: Compare Word Lengths
        if len(word) > max_length:
            max_length = len(word)
            longest = word
    
    # Step 6: Return the Longest Word
    return longest

# Test the function
print("\n=== Challenge 2: Longest Word ===")
print(f"longest_word(\"Margaret's toy is a pretty doll.\") = \"{longest_word("Margaret's toy is a pretty doll.")}\"")
print(f"longest_word(\"A thing of beauty is a joy forever.\") = \"{longest_word("A thing of beauty is a joy forever.")}\"")
print(f"longest_word(\"Forgetfulness is by all means powerless!\") = \"{longest_word("Forgetfulness is by all means powerless!")}\"")

# Complete Program with User Interaction
def sort_words():
    """Challenge 1: Sort comma-separated words"""
    print("\n" + "="*50)
    print("CHALLENGE 1: SORTING COMMA-SEPARATED WORDS")
    print("="*50)
    
    # Step 1: Get Input
    input_string = input("Enter words separated by commas (e.g., 'apple,banana,cherry'): ")
    
    # Step 2: Split the String
    words_list = input_string.split(',')
    
    # Step 3: Sort the List
    words_list.sort()
    
    # Step 4: Join the Sorted List
    result_string = ','.join(words_list)
    
    # Step 5: Print the Result
    print(f"Original: {input_string}")
    print(f"Sorted:   {result_string}")
    
    return result_string

def find_longest_word():
    """Challenge 2: Find the longest word in a sentence"""
    print("\n" + "="*50)
    print("CHALLENGE 2: FINDING THE LONGEST WORD")
    print("="*50)
    
    # Step 1: Get Input
    sentence = input("Enter a sentence: ")
    
    # Step 2: Split the Sentence into Words
    words = sentence.split()
    
    # Step 3: Initialize Variables
    longest = ""
    max_length = 0
    
    # Step 4: Iterate Through the Words
    for word in words:
        # Step 5: Compare Word Lengths
        if len(word) > max_length:
            max_length = len(word)
            longest = word
    
    # Step 6: Return/Print the Longest Word
    print(f"Sentence: '{sentence}'")
    print(f"Longest word: '{longest}' (length: {max_length} characters)")
    
    return longest

def demo_both_challenges():
    """Demonstrate both challenges with test cases"""
    print("="*50)
    print("DEMONSTRATION OF BOTH CHALLENGES")
    print("="*50)
    
    # Demo Challenge 1
    print("\n--- Challenge 1 Demo ---")
    test_cases = [
        "without,hello,bag,world",
        "zebra,apple,monkey,banana",
        "python,java,cpp,javascript"
    ]
    
    for test in test_cases:
        words_list = test.split(',')
        words_list.sort()
        result = ','.join(words_list)
        print(f"Input:  {test}")
        print(f"Output: {result}\n")
    
    # Demo Challenge 2
    print("\n--- Challenge 2 Demo ---")
    test_sentences = [
        "Margaret's toy is a pretty doll.",
        "A thing of beauty is a joy forever.",
        "Forgetfulness is by all means powerless!"
    ]
    
    for sentence in test_sentences:
        longest = longest_word(sentence)
        print(f"Sentence: '{sentence}'")
        print(f"Longest word: '{longest}'\n")

# Main program execution
if __name__ == "__main__":
    # Run demonstrations
    demo_both_challenges()
    
    # Interactive mode
    while True:
        print("\n" + "="*50)
        print("MAIN MENU")
        print("="*50)
        print("1. Sort comma-separated words")
        print("2. Find longest word in sentence")
        print("3. Exit")
        
        choice = input("\nEnter your choice (1-3): ").strip()
        
        if choice == '1':
            sort_words()
        elif choice == '2':
            find_longest_word()
        elif choice == '3':
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please enter 1, 2, or 3.")
            
#            



