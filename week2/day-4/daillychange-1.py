import string
import re

class Text:
    def __init__(self, text):
        self.text = text

    def word_frequency(self, word):
        if not word:
            return "Provided word is empty."
        words = self.text.lower().split()
        count = words.count(word.lower())
        if count == 0:
            return f"The word '{word}' was not found."
        return count

    def most_common_word(self):
        words = self.text.lower().split()
        freq = {}
        for w in words:
            freq[w] = freq.get(w, 0) + 1
        if not freq:
            return "Text contains no words."
        return max(freq, key=freq.get)

    def unique_words(self):
        words = self.text.lower().split()
        return list(set(words))

    @classmethod
    def from_file(cls, file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            return cls(content)
        except FileNotFoundError:
            print("File not found.")
            return None

# List of common English stopwords (you can extend this list as needed)
STOP_WORDS = set([
    "a", "about", "above", "after", "again", "against", "all", "am",
    "an", "and", "any", "are", "as", "at", "be", "because", "been",
    "before", "being", "below", "between", "both", "but", "by", "could",
    "did", "do", "does", "doing", "down", "during", "each", "few", "for",
    "from", "further", "had", "has", "have", "having", "he", "her",
    "here", "hers", "herself", "him", "himself", "his", "how", "i",
    "if", "in", "into", "is", "it", "its", "itself", "me", "more",
    "most", "my", "myself", "nor", "of", "on", "once", "only", "or",
    "other", "ought", "our", "ours", "ourselves", "out", "over", "own",
    "same", "she", "should", "so", "some", "such", "than", "that",
    "the", "their", "theirs", "them", "themselves", "then", "there",
    "these", "they", "this", "those", "through", "to", "too", "under",
    "until", "up", "very", "was", "we", "were", "what", "when", "where",
    "which", "while", "who", "whom", "why", "with", "would", "you",
    "your", "yours", "yourself", "yourselves"
])

class TextModification(Text):
    def remove_punctuation(self):
        # Use str.translate to efficiently remove punctuation
        translator = str.maketrans('', '', string.punctuation)
        return self.text.translate(translator)

    def remove_stop_words(self):
        words = self.text.split()
        filtered_words = [word for word in words if word.lower() not in STOP_WORDS]
        return " ".join(filtered_words)

    def remove_special_characters(self):
        # Remove all characters except letters, numbers, and spaces
        return re.sub(r'[^A-Za-z0-9\s]', '', self.text)

# Example Usage:
if __name__ == "__main__":
    s = "Hello, world! The world is big, and Python is fun. Hello!"
    txt = Text(s)

    print("Frequency of 'world':", txt.word_frequency('world'))
    print("Most common word:", txt.most_common_word())
    print("Unique words:", txt.unique_words())

    # For file-based analysis:
    # txt_file = Text.from_file("example.txt")
    # print(txt_file.most_common_word())

    txt_mod = TextModification(s)
    print("Without punctuation:", txt_mod.remove_punctuation())
    print("Without stop words:", txt_mod.remove_stop_words())
    print("Without special characters:", txt_mod.remove_special_characters())
