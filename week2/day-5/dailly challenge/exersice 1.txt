Exercise 1: Quiz Answers
1. What is a class?
A class is a blueprint or template for creating objects. It defines the attributes (data) and methods (functions) that the objects created from the class will have. Classes encapsulate data and behavior into a single unit.

2. What is an instance?
An instance is a specific object created from a class. Each instance has its own separate copy of the instance variables defined in the class. For example, if Dog is a class, then my_dog = Dog() creates an instance of the Dog class.

3. What is encapsulation?
Encapsulation is the practice of bundling data and methods that operate on that data within a single unit (class), while restricting direct access to some of the object's components. This is typically achieved using private/protected attributes and public methods (getters/setters).

4. What is abstraction?
Abstraction is the concept of hiding complex implementation details and showing only the essential features of an object. It allows users to interact with objects at a higher level without needing to understand the internal complexity.

5. What is inheritance?
Inheritance is a mechanism where a new class (child/subclass) derives attributes and methods from an existing class (parent/superclass). This promotes code reuse and establishes a "is-a" relationship between classes.

6. What is multiple inheritance?
Multiple inheritance occurs when a class inherits from more than one parent class. The child class gains attributes and methods from all parent classes. Python supports multiple inheritance.

7. What is polymorphism?
Polymorphism allows objects of different classes to be treated as objects of a common superclass. It enables the same method name to behave differently based on the object that calls it. "Poly" means many, "morph" means forms.

8. What is method resolution order or MRO?
MRO is the order in which Python looks for methods in a hierarchy of classes, especially important in multiple inheritance. It determines which method implementation gets executed when a method is called. In Python, you can view MRO using ClassName.__mro__ or ClassName.mro().

Exercise 2: Deck of Cards Implementation
python
import random

class Card:
    """Represents a single playing card"""
    
    def __init__(self, suit: str, value: str):
        """
        Initialize a card with suit and value
        
        Args:
            suit: One of 'Hearts', 'Diamonds', 'Clubs', 'Spades'
            value: One of 'A','2','3','4','5','6','7','8','9','10','J','Q','K'
        """
        self.suit = suit
        self.value = value
    
    def __str__(self) -> str:
        """String representation of the card"""
        return f"{self.value} of {self.suit}"
    
    def __repr__(self) -> str:
        """Official string representation for debugging"""
        return f"Card('{self.suit}', '{self.value}')"

class Deck:
    """Represents a deck of 52 playing cards"""
    
    def __init__(self):
        """Initialize a full deck of 52 cards"""
        self.cards = []
        self._initialize_deck()
    
    def _initialize_deck(self) -> None:
        """Create all 52 cards in the deck"""
        suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        
        # Clear any existing cards and create fresh deck
        self.cards.clear()
        
        # Create all combinations of suits and values
        for suit in suits:
            for value in values:
                self.cards.append(Card(suit, value))
    
    def shuffle(self) -> None:
        """
        Shuffle the deck randomly
        Makes sure the deck has all 52 cards before shuffling
        """
        # Ensure we have a full deck
        if len(self.cards) != 52:
            self._initialize_deck()
        
        # Shuffle the cards randomly
        random.shuffle(self.cards)
    
    def deal(self) -> Card:
        """
        Deal a single card from the top of the deck
        
        Returns:
            Card: The dealt card
            
        Raises:
            ValueError: If no cards left in deck
        """
        if not self.cards:
            raise ValueError("Cannot deal from an empty deck")
        
        # Remove and return the top card (last card in the list)
        return self.cards.pop()
    
    def count(self) -> int:
        """Return the number of cards remaining in the deck"""
        return len(self.cards)
    
    def reset(self) -> None:
        """Reset the deck to full 52 cards in order"""
        self._initialize_deck()
    
    def __str__(self) -> str:
        """String representation of the deck"""
        return f"Deck of {self.count()} cards"
    
    def __repr__(self) -> str:
        """Official string representation"""
        return f"Deck({self.count()} cards)"
    
    def __len__(self) -> int:
        """Allow len(deck) to get card count"""
        return self.count()

# Demonstration and testing
if __name__ == "__main__":
    # Create a new deck
    deck = Deck()
    print(f"Initial deck: {deck}")
    print(f"Cards in deck: {len(deck)}")
    
    # Shuffle the deck
    print("\nShuffling the deck...")
    deck.shuffle()
    print(f"After shuffling: {deck}")
    
    # Deal some cards
    print("\nDealing 5 cards:")
    for i in range(5):
        card = deck.deal()
        print(f"Card {i+1}: {card}")
    
    print(f"\nCards remaining: {len(deck)}")
    
    # Try dealing all remaining cards
    print(f"\nDealing all remaining {len(deck)} cards:")
    try:
        while len(deck) > 0:
            card = deck.deal()
            print(f"Dealt: {card}")
    except ValueError as e:
        print(f"Error: {e}")
    
    print(f"\nFinal deck count: {len(deck)}")
    
    # Test dealing from empty deck
    print("\nTrying to deal from empty deck:")
    try:
        card = deck.deal()
    except ValueError as e:
        print(f"Expected error: {e}")
    
    # Reset the deck
    print("\nResetting the deck...")
    deck.reset()
    print(f"After reset: {deck}")
    
    # Show first few cards to verify order
    print("\nFirst 5 cards in order:")
    for i in range(5):
        card = deck.deal()
        print(f"Card {i+1}: {card}")