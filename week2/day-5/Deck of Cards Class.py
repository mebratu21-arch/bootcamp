# Exercise 1: Quizz Answers
print("=== EXERCISE 1: QUIZZ ANSWERS ===")
print("")
print("1. What is a Class?")
print("   Answer: A blueprint for creating objects, defining attributes and methods.")
print("")
print("2. What is an Instance?")
print("   Answer: A specific object created from a class.")
print("")
print("3. What is Encapsulation?")
print("   Answer: Bundling data and methods that operate on that data within a class, restricting direct access.")
print("")
print("4. What is Abstraction?")
print("   Answer: Hiding complex implementation details and exposing only essential features.")
print("")
print("5. What is Inheritance?")
print("   Answer: Allowing a class to inherit attributes and methods from another class.")
print("")
print("6. What is Multiple Inheritance?")
print("   Answer: A class inheriting from more than one parent class.")
print("")
print("7. What is Polymorphism?")
print("   Answer: The ability to use a common interface for different underlying forms (e.g., methods with the same name but different implementations).")
print("")
print("8. What is Method Resolution Order or MRO?")
print("   Answer: The order in which Python searches for methods in a hierarchy of classes.")
print("")
print("==================================================")
print("")
print("=== EXERCISE 2: DECK OF CARDS CLASS ===")
print("")

# Exercise 2: Deck of Cards Implementation
import random

class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value
    
    def __str__(self):
        return f"{self.value} of {self.suit}"

class Deck:
    def __init__(self):
        self.cards = []
        self.build()
        print("New deck created with 52 cards!")
    
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
            print("Cannot deal from an empty deck!")
            return None
        dealt_card = self.cards.pop()
        print(f"Dealt card: {dealt_card}")
        print(f"Cards remaining: {len(self.cards)}")
        return dealt_card

# Demonstration
print("Creating a new deck...")
deck = Deck()
print("")

print("Shuffling the deck...")
deck.shuffle()
print("")

print("Dealing 5 cards:")
print("")
deck.deal()
print("")
deck.deal()
print("")
deck.deal()
print("")
deck.deal()
print("")
deck.deal()
print("")

print(f"Final cards remaining: {len(deck.cards)}")