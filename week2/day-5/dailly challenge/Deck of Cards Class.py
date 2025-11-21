import random

class Card:
    """Represents a single playing card."""
    suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
    values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

    def __init__(self, suit, value):
        if suit not in Card.suits:
            raise ValueError(f"Invalid suit: {suit}")
        if value not in Card.values:
            raise ValueError(f"Invalid value: {value}")
        self.suit = suit
        self.value = value

    def __repr__(self):
        return f"{self.value} of {self.suit}"


class Deck:
    """Represents a deck of 52 playing cards."""
    
    def __init__(self):
        self.cards = [Card(suit, value) for suit in Card.suits for value in Card.values]

    def shuffle(self):
        """Shuffle the deck if it has all 52 cards."""
        if len(self.cards) != 52:
            raise ValueError("Can only shuffle a full deck of 52 cards.")
        random.shuffle(self.cards)

    def deal(self):
        """Deal a single card from the deck and remove it."""
        if not self.cards:
            raise ValueError("All cards have been dealt.")
        return self.cards.pop()

# Example usage:
deck = Deck()
deck.shuffle()
print(deck.deal())  # Example: '7 of Hearts'
print(len(deck.cards))  # 51 cards left
