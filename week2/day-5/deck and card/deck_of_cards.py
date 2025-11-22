import random

class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value
    
    def __str__(self):
        return f"{self.value} of {self.suit}"
    
    def __repr__(self):
        return f"Card('{self.suit}', '{self.value}')"

class Deck:
    def __init__(self):
        self.cards = []
        self.build()
    
    def build(self):
        suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
        self.cards = [Card(suit, value) for suit in suits for value in values]
    
    def shuffle(self):
        if len(self.cards) != 52:
            print("Deck is incomplete! Rebuilding deck...")
            self.build()
        random.shuffle(self.cards)
        print("Deck shuffled successfully!")
    
    def deal(self):
        if not self.cards:
            print("No cards left in the deck!")
            return None
        card = self.cards.pop()
        return card
    
    def __str__(self):
        return f"Deck of {len(self.cards)} cards"

# Demonstration
if __name__ == "__main__":
    print("=== DECK OF CARDS DEMONSTRATION ===")
    
    deck = Deck()
    print(f"Created: {deck}")
    
    deck.shuffle()
    
    print("\nDealing 5 cards:")
    for i in range(5):
        card = deck.deal()
        print(f"  Card {i+1}: {card}")
    
    print(f"\nCards remaining: {len(deck.cards)}")