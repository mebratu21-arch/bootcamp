import random

def get_built_in_words():
    """Return a built-in list of words (no file needed)"""
    words = [
        "apple", "banana", "cat", "dog", "elephant", "frog", "giraffe", "house",
        "ice", "cream", "jelly", "kite", "lemon", "mango", "night", "ocean",
        "piano", "queen", "river", "sun", "tree", "umbrella", "violin", "whale",
        "xylophone", "yacht", "zebra", "computer", "phone", "book", "car", "city",
        "country", "day", "eye", "face", "game", "hand", "job", "king", "life",
        "man", "name", "part", "point", "question", "room", "state", "thing",
        "time", "water", "way", "work", "year", "people", "history", "art",
        "world", "information", "map", "family", "government", "health", "system",
        "music", "person", "reading", "data", "food", "theory", "law", "bird",
        "literature", "problem", "software", "knowledge", "power", "economics",
        "love", "internet", "science", "library", "nature", "idea", "investment"
    ]
    return words

def get_random_sentence(length, words_list):
    """Generate a random sentence of specified length"""
    selected_words = random.choices(words_list, k=length)
    sentence = ' '.join(selected_words).lower()
    return sentence

def main():
    print("=" * 50)
    print("        RANDOM SENTENCE GENERATOR")
    print("=" * 50)
    print("This program generates random sentences.")
    print("No external files needed!")
    print()
    
    words = get_built_in_words()
    print(f"Using built-in word list with {len(words)} words.")
    print()
    
    try:
        length = int(input("How many words should be in your sentence? (2-20): "))
        
        if length < 2 or length > 20:
            print("Error: Sentence length must be between 2 and 20.")
            return
            
        sentence = get_random_sentence(length, words)
        print("\n" + "=" * 50)
        print("YOUR RANDOM SENTENCE:")
        print(sentence.capitalize() + ".")
        print("=" * 50)
        
    except ValueError:
        print("Error: Please enter a valid integer.")

if __name__ == "__main__":
    main()