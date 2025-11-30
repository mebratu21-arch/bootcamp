# translator.py
def simple_french_translator(word):
    """
    Simple hardcoded translator for common French words
    """
    translation_dict = {
        "Bonjour": "Hello",
        "Au revoir": "Goodbye", 
        "Bienvenue": "Welcome",
        "A bientôt": "See you soon",
        "Merci": "Thank you",
        "Oui": "Yes",
        "Non": "No",
        "S'il vous plaît": "Please"
    }
    
    return translation_dict.get(word, "Translation not available")

# Main code with exception handling
french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]
result = {}

print("Translating French words to English...")
print("=" * 40)

for word in french_words:
    try:
        translation = simple_french_translator(word)
        result[word] = translation
        print(f"✓ '{word}' -> '{translation}'")
        
    except Exception as e:
        print(f"Error with '{word}': {e}")
        result[word] = f"Error: {type(e).__name__}"

print("\n" + "=" * 40)
print("FINAL RESULT:")
print(result)