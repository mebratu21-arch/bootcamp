import os

class AnagramChecker:
    def __init__(self, file_path='word_list.txt'):
        """
        Initialize the AnagramChecker by loading words from a file
        """
        self.word_list = set()
        self.load_word_list(file_path)
    
    def load_word_list(self, file_path):
        """
        Load words from file with better error handling
        """
        # Check if file exists
        if not os.path.exists(file_path):
            print(f"Error: File '{file_path}' not found in directory: {os.getcwd()}")
            print("Creating a sample word list...")
            self.create_sample_word_list(file_path)
        
        try:
            with open(file_path, 'r') as file:
                words_loaded = 0
                for line in file:
                    word = line.strip().lower()
                    if word and word.isalpha():  # Only add valid words
                        self.word_list.add(word)
                        words_loaded += 1
                print(f"Successfully loaded {words_loaded} words from {file_path}")
                
        except Exception as e:
            print(f"Error reading file '{file_path}': {e}")

    def create_sample_word_list(self, file_path='word_list.txt'):
        """
        Create a sample word list file for testing
        """
        sample_words = [
            "apple", "meat", "mate", "tame", "team", "hello", "world", 
            "python", "code", "program", "animal", "computer", "science", 
            "data", "algorithm", "function", "variable", "class", "object", 
            "method", "string", "number", "list", "dictionary", "set", 
            "tuple", "loop", "conditional", "input", "output", "file", 
            "error", "exception", "module", "package", "library", "framework", 
            "development", "software", "hardware", "system", "network", 
            "database", "security", "web", "mobile", "desktop", "server", 
            "client", "browser", "internet", "cloud", "eat", "tea", "ate",
            "care", "race", "acre", "listen", "silent", "post", "stop", "tops"
        ]
        
        try:
            with open(file_path, 'w') as file:
                for word in sample_words:
                    file.write(word + '\n')
            print(f"Created sample word list with {len(sample_words)} words at '{file_path}'")
            return True
        except Exception as e:
            print(f"Error creating sample word list: {e}")
            return False

    def is_valid_word(self, word):
        """
        Check if the given word exists in the word list
        """
        if not self.word_list:
            print("Warning: Word list is empty. Cannot validate word.")
            return False
        return word.lower() in self.word_list

    @staticmethod
    def is_anagram(word1, word2):
        """
        Check if two words are anagrams of each other
        """
        # Convert to lowercase and sort characters
        return sorted(word1.lower()) == sorted(word2.lower())

    def get_anagrams(self, word):
        """
        Find all anagrams for the given word (excluding the word itself)
        """
        if not self.word_list:
            return []
            
        anagrams = []
        word_lower = word.lower()
        
        for potential_anagram in self.word_list:
            # Check if it's an anagram and not the same word
            if (self.is_anagram(word_lower, potential_anagram) and 
                potential_anagram != word_lower):
                anagrams.append(potential_anagram)
        
        return anagrams