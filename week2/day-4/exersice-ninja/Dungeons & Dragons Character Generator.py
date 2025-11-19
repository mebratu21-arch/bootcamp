import random
import json
from datetime import datetime

class Character:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.stats = {
            "Strength": self._generate_stat(),
            "Dexterity": self._generate_stat(),
            "Constitution": self._generate_stat(),
            "Intelligence": self._generate_stat(),
            "Wisdom": self._generate_stat(),
            "Charisma": self._generate_stat()
        }
    
    def _generate_stat(self):
        """Roll 4d6 and sum the highest 3 dice"""
        rolls = [random.randint(1, 6) for _ in range(4)]
        rolls.sort(reverse=True)
        return sum(rolls[:3])
    
    def get_modifier(self, stat_value):
        """Calculate ability modifier"""
        return (stat_value - 10) // 2
    
    def to_dict(self):
        """Convert character to dictionary"""
        return {
            "name": self.name,
            "age": self.age,
            "stats": self.stats,
            "modifiers": {stat: self.get_modifier(value) for stat, value in self.stats.items()}
        }
    
    def display(self):
        """Display character information"""
        print(f"\n🧙 Character: {self.name}")
        print(f"🎂 Age: {self.age}")
        print("\n📊 Attributes:")
        for stat, value in self.stats.items():
            modifier = self.get_modifier(value)
            modifier_str = f"+{modifier}" if modifier >= 0 else str(modifier)
            print(f"  {stat}: {value} ({modifier_str})")

class Game:
    def __init__(self):
        self.players = []
    
    def add_player(self, name, age):
        """Create and add a new character"""
        character = Character(name, age)
        self.players.append(character)
        return character
    
    def export_to_txt(self, filename="dnd_characters.txt"):
        """Export all characters to a nicely formatted text file"""
        with open(filename, 'w') as file:
            file.write("="*60 + "\n")
            file.write("DUNGEONS & DRAGONS - CHARACTER SHEETS\n")
            file.write("="*60 + "\n")
            file.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            file.write(f"Number of players: {len(self.players)}\n\n")
            
            for i, character in enumerate(self.players, 1):
                file.write("-"*60 + "\n")
                file.write(f"PLAYER {i}: {character.name.upper()}\n")
                file.write("-"*60 + "\n")
                file.write(f"Name: {character.name}\n")
                file.write(f"Age: {character.age}\n\n")
                
                file.write("ATTRIBUTES:\n")
                file.write("-"*30 + "\n")
                for stat, value in character.stats.items():
                    modifier = character.get_modifier(value)
                    modifier_str = f"+{modifier}" if modifier >= 0 else str(modifier)
                    file.write(f"{stat:15} {value:2} ({modifier_str:>3})\n")
                
                file.write("\nABILITY MODIFIERS EXPLANATION:\n")
                file.write("Modifier = (Ability Score - 10) // 2\n")
                file.write("Used for skill checks, attack rolls, and saving throws\n\n")
        
        print(f"✅ Characters exported to {filename}")
    
    def export_to_json(self, filename="dnd_characters.json"):
        """Export all characters to JSON file"""
        characters_data = {
            "game_info": {
                "total_players": len(self.players),
                "generation_date": datetime.now().isoformat(),
                "system": "Dungeons & Dragons"
            },
            "characters": [character.to_dict() for character in self.players]
        }
        
        with open(filename, 'w') as file:
            json.dump(characters_data, file, indent=2)
        
        print(f"✅ Characters exported to {filename}")
    
    def display_all_characters(self):
        """Display all created characters"""
        if not self.players:
            print("\nNo characters created yet!")
            return
        
        print("\n" + "="*50)
        print("🎲 ALL CHARACTERS")
        print("="*50)
        
        for character in self.players:
            character.display()
    
    def run_character_creation(self):
        """Run the character creation process"""
        print("\n" + "🎲" * 20)
        print("DUNGEONS & DRAGONS CHARACTER GENERATOR")
        print("🎲" * 20)
        
        # Get number of players
        while True:
            try:
                num_players = int(input("\nHow many players are playing? "))
                if num_players > 0:
                    break
                else:
                    print("Please enter a positive number.")
            except ValueError:
                print("Please enter a valid number.")
        
        # Create characters for each player
        for i in range(num_players):
            print(f"\n--- Creating Character for Player {i+1} ---")
            
            name = input("Enter character name: ").strip()
            
            while True:
                try:
                    age = int(input("Enter character age: "))
                    if age > 0:
                        break
                    else:
                        print("Age must be positive.")
                except ValueError:
                    print("Please enter a valid age.")
            
            # Create character
            character = self.add_player(name, age)
            
            # Show the created character
            character.display()
            
            # Show dice rolling explanation for first character
            if i == 0:
                print("\n🎯 How stats are generated:")
                print("   • Roll 4 six-sided dice (4d6)")
                print("   • Drop the lowest roll")
                print("   • Sum the three highest rolls")
                print("   • Repeat for each of the 6 attributes")
        
        # After all characters are created
        print(f"\n🎉 Successfully created {len(self.players)} characters!")
        
        # Export options
        while True:
            print("\n" + "="*40)
            print("EXPORT OPTIONS")
            print("="*40)
            print("1. Export to Text File")
            print("2. Export to JSON File")
            print("3. Export to Both")
            print("4. Show Characters Again")
            print("5. Exit")
            
            choice = input("\nEnter your choice (1-5): ").strip()
            
            if choice == '1':
                self.export_to_txt()
            elif choice == '2':
                self.export_to_json()
            elif choice == '3':
                self.export_to_txt()
                self.export_to_json()
            elif choice == '4':
                self.display_all_characters()
            elif choice == '5':
                print("Happy adventuring! 🐉")
                break
            else:
                print("Invalid choice. Please try again.")

# Example usage with demo
def demo_dnd():
    """Run a demo of the D&D character generator"""
    game = Game()
    
    # Create some demo characters
    demo_chars = [
        ("Aragorn", 87),
        ("Legolas", 2931),
        ("Gandalf", 2019)
    ]
    
    for name, age in demo_chars:
        game.add_player(name, age)
    
    print("🎲 DEMO: D&D Character Generator")
    game.display_all_characters()
    game.export_to_txt("demo_characters.txt")
    game.export_to_json("demo_characters.json")

# Main execution
if __name__ == "__main__":
    print("Choose an exercise to run:")
    print("1. Restaurant Menu Manager")
    print("2. Dungeons & Dragons Character Generator")
    print("3. Run D&D Demo")
    
    choice = input("\nEnter your choice (1-3): ").strip()
    
    if choice == '1':
        manager = RestaurantMenuManager()
        manager.run()
    elif choice == '2':
        game = Game()
        game.run_character_creation()
    elif choice == '3':
        demo_dnd()
    else:
        print("Invalid choice!")