import string
import re

class Text:
    def __init__(self, text):
        self.text = text
    
    def word_frequency(self, word):
        """Count occurrences of a specific word in the text"""
        words = self.text.split()
        count = words.count(word)
        return count if count > 0 else f"'{word}' not found in the text"
    
    def most_common_word(self):
        """Find the most common word in the text"""
        words = self.text.split()
        if not words:
            return "No words found"
        
        word_freq = {}
        for word in words:
            word_freq[word] = word_freq.get(word, 0) + 1
        
        return max(word_freq, key=word_freq.get)
    
    def unique_words(self):
        """Return a list of all unique words in the text"""
        words = self.text.split()
        return list(set(words))
    
    @classmethod
    def from_file(cls, file_path):
        """Create a Text instance from a file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            return cls(content)
        except FileNotFoundError:
            print(f"Error: File '{file_path}' not found.")
            return cls("")
        except Exception as e:
            print(f"Error reading file: {e}")
            return cls("")


class TextModification(Text):
    def __init__(self, text):
        super().__init__(text)
    
    def remove_punctuation(self):
        """Remove punctuation from the text"""
        translator = str.maketrans('', '', string.punctuation)
        return self.text.translate(translator)
    
    def remove_stop_words(self):
        """Remove common English stop words from the text"""
        stop_words = {
            'a', 'an', 'the', 'and', 'or', 'but', 'if', 'because', 'as', 'until',
            'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between',
            'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to',
            'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
            'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how',
            'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some',
            'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too',
            'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now', 'is',
            'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do',
            'does', 'did', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him',
            'her', 'us', 'them'
        }
        
        words = self.text.split()
        filtered_words = [word for word in words if word.lower() not in stop_words]
        return ' '.join(filtered_words)
    
    def remove_special_characters(self):
        """Remove special characters using regular expressions"""
        # Keep only alphanumeric characters and spaces
        return re.sub(r'[^a-zA-Z0-9\s]', '', self.text)


# Demonstration of the classes
if __name__ == "__main__":
    print("=== Part I: Analyzing a Simple String ===")
    
    # Create a Text instance with a sample string
    sample_text = "Hello world! Hello everyone. This is a test. Hello again."
    text_analyzer = Text(sample_text)
    
    print(f"Original text: {sample_text}")
    print(f"Frequency of 'Hello': {text_analyzer.word_frequency('Hello')}")
    print(f"Frequency of 'Python': {text_analyzer.word_frequency('Python')}")
    print(f"Most common word: {text_analyzer.most_common_word()}")
    print(f"Unique words: {text_analyzer.unique_words()}")
    
    print("\n=== Part II: Analyzing Text from a File ===")
    
    # Create a sample file for testing
    with open('sample_text.txt', 'w') as f:
        f.write("This is a sample text file.\nIt contains multiple lines.\nWe will analyze this text.")
    
    # Create Text instance from file
    file_text = Text.from_file('sample_text.txt')
    print(f"Text from file: {file_text.text}")
    print(f"Most common word in file: {file_text.most_common_word()}")
    
    print("\n=== Bonus: Text Modification ===")
    
    # Create TextModification instance
    messy_text = "Hello, world! This is a test. It has punctuation, stop words, and special characters!"
    text_mod = TextModification(messy_text)
    
    print(f"Original messy text: {messy_text}")
    print(f"Without punctuation: {text_mod.remove_punctuation()}")
    print(f"Without stop words: {text_mod.remove_stop_words()}")
    print(f"Without special characters: {text_mod.remove_special_characters()}")
    
    # Chain modifications
    cleaned_text = text_mod.remove_punctuation()
    text_mod_clean = TextModification(cleaned_text)
    final_text = text_mod_clean.remove_stop_words()
    print(f"Fully cleaned text: {final_text}")