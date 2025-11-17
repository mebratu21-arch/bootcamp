import time
import os
import random

class Cell:
    """Represents a single cell in the Game of Life"""
    def __init__(self, alive=False):
        self.alive = alive
    
    def __str__(self):
        return '■' if self.alive else ' '
    
    def update_state(self, live_neighbors):
        """Update cell state based on Game of Life rules"""
        if self.alive:
            # Live cell rules
            if live_neighbors < 2 or live_neighbors > 3:
                return False  # Dies
            else:
                return True   # Survives
        else:
            # Dead cell rules
            if live_neighbors == 3:
                return True   # Becomes alive
            else:
                return False  # Stays dead

class GameOfLife:
    """Main Game of Life implementation"""
    
    def __init__(self, width=20, height=20, expandable=False, max_size=10000):
        self.width = width
        self.height = height
        self.expandable = expandable
        self.max_size = max_size
        self.grid = self.create_grid(width, height)
        self.generation = 0
    
    def create_grid(self, width, height):
        """Create a new grid of specified dimensions"""
        return [[Cell() for _ in range(width)] for _ in range(height)]
    
    def initialize_random(self, density=0.3):
        """Initialize grid with random live cells"""
        for y in range(self.height):
            for x in range(self.width):
                if random.random() < density:
                    self.grid[y][x].alive = True
    
    def initialize_pattern(self, pattern_name):
        """Initialize with predefined patterns"""
        # Clear the grid first
        for y in range(self.height):
            for x in range(self.width):
                self.grid[y][x].alive = False
        
        center_x, center_y = self.width // 2, self.height // 2
        
        if pattern_name == "glider":
            # Glider pattern
            patterns = [(1,0), (2,1), (0,2), (1,2), (2,2)]
            for dx, dy in patterns:
                x, y = center_x + dx, center_y + dy
                if 0 <= x < self.width and 0 <= y < self.height:
                    self.grid[y][x].alive = True
        
        elif pattern_name == "blinker":
            # Blinker oscillator
            for dx in range(-1, 2):
                x, y = center_x + dx, center_y
                if 0 <= x < self.width and 0 <= y < self.height:
                    self.grid[y][x].alive = True
        
        elif pattern_name == "block":
            # Still life - block
            patterns = [(0,0), (1,0), (0,1), (1,1)]
            for dx, dy in patterns:
                x, y = center_x + dx, center_y + dy
                if 0 <= x < self.width and 0 <= y < self.height:
                    self.grid[y][x].alive = True
        
        elif pattern_name == "beacon":
            # Beacon oscillator
            patterns = [(0,0), (1,0), (0,1), (1,1), (2,2), (3,2), (2,3), (3,3)]
            for dx, dy in patterns:
                x, y = center_x + dx - 1, center_y + dy - 1
                if 0 <= x < self.width and 0 <= y < self.height:
                    self.grid[y][x].alive = True
        
        elif pattern_name == "random_dense":
            self.initialize_random(0.5)
    
    def count_live_neighbors(self, x, y):
        """Count live neighbors for a cell at position (x, y)"""
        count = 0
        for dy in [-1, 0, 1]:
            for dx in [-1, 0, 1]:
                if dx == 0 and dy == 0:
                    continue  # Skip the cell itself
                
                nx, ny = x + dx, y + dy
                
                # Check bounds
                if 0 <= nx < self.width and 0 <= ny < self.height:
                    if self.grid[ny][nx].alive:
                        count += 1
        return count
    
    def expand_grid_if_needed(self):
        """Expand the grid if there are live cells near the border (for expandable mode)"""
        if not self.expandable or self.width >= self.max_size or self.height >= self.max_size:
            return
        
        # Check if we need to expand in any direction
        expand_top = any(self.grid[0][x].alive for x in range(self.width))
        expand_bottom = any(self.grid[self.height-1][x].alive for x in range(self.width))
        expand_left = any(self.grid[y][0].alive for y in range(self.height))
        expand_right = any(self.grid[y][self.width-1].alive for y in range(self.height))
        
        if expand_top and self.height < self.max_size:
            # Add new row at top
            new_row = [Cell() for _ in range(self.width)]
            self.grid.insert(0, new_row)
            self.height += 1
        
        if expand_bottom and self.height < self.max_size:
            # Add new row at bottom
            new_row = [Cell() for _ in range(self.width)]
            self.grid.append(new_row)
            self.height += 1
        
        if expand_left and self.width < self.max_size:
            # Add new column at left
            for row in self.grid:
                row.insert(0, Cell())
            self.width += 1
        
        if expand_right and self.width < self.max_size:
            # Add new column at right
            for row in self.grid:
                row.append(Cell())
            self.width += 1
    
    def update_generation(self):
        """Update the grid to the next generation"""
        if self.expandable:
            self.expand_grid_if_needed()
        
        # Create a new grid for the next generation
        new_grid = self.create_grid(self.width, self.height)
        
        for y in range(self.height):
            for x in range(self.width):
                live_neighbors = self.count_live_neighbors(x, y)
                new_grid[y][x].alive = self.grid[y][x].update_state(live_neighbors)
        
        self.grid = new_grid
        self.generation += 1
    
    def display(self):
        """Display the current grid state"""
        os.system('cls' if os.name == 'nt' else 'clear')  # Clear console
        
        print(f"Generation: {self.generation}")
        print(f"Grid size: {self.width} x {self.height}")
        print("+" + "-" * self.width + "+")
        
        for y in range(self.height):
            print("|", end="")
            for x in range(self.width):
                print(str(self.grid[y][x]), end="")
            print("|")
        
        print("+" + "-" * self.width + "+")
    
    def count_live_cells(self):
        """Count total live cells"""
        count = 0
        for y in range(self.height):
            for x in range(self.width):
                if self.grid[y][x].alive:
                    count += 1
        return count
    
    def run_simulation(self, generations=50, delay=0.5):
        """Run the simulation for specified number of generations"""
        print("Starting Game of Life Simulation!")
        print("Rules:")
        print("- Live cell with <2 neighbors dies (underpopulation)")
        print("- Live cell with 2-3 neighbors survives")
        print("- Live cell with >3 neighbors dies (overpopulation)")
        print("- Dead cell with exactly 3 neighbors becomes alive (reproduction)")
        print("\nPress Ctrl+C to stop early\n")
        
        try:
            for i in range(generations):
                self.display()
                print(f"Live cells: {self.count_live_cells()}")
                print(f"Border type: {'Expandable' if self.expandable else 'Fixed'}")
                
                self.update_generation()
                time.sleep(delay)
                
                # Stop if no live cells remain
                if self.count_live_cells() == 0:
                    print("\nAll cells have died! Simulation ended.")
                    break
            
            self.display()
            print(f"Simulation completed after {self.generation} generations")
            
        except KeyboardInterrupt:
            print("\nSimulation stopped by user")

def demo_different_patterns():
    """Demonstrate different initial states"""
    patterns = [
        ("glider", "Glider (spaceship)"),
        ("blinker", "Blinker (oscillator)"),
        ("block", "Block (still life)"),
        ("beacon", "Beacon (oscillator)"),
        ("random_dense", "Random dense population")
    ]
    
    for pattern, description in patterns:
        print(f"\n{'='*50}")
        print(f"Testing: {description}")
        print(f"{'='*50}")
        
        game = GameOfLife(width=20, height=15, expandable=False)
        game.initialize_pattern(pattern)
        game.run_simulation(generations=15, delay=0.3)

def compare_border_types():
    """Compare fixed vs expandable borders"""
    print("\n" + "="*60)
    print("COMPARING FIXED vs EXPANDABLE BORDERS")
    print("="*60)
    
    # Fixed borders
    print("\n1. FIXED BORDERS (glider hits border):")
    game_fixed = GameOfLife(width=8, height=8, expandable=False)
    game_fixed.initialize_pattern("glider")
    game_fixed.run_simulation(generations=12, delay=0.4)
    
    # Expandable borders
    print("\n2. EXPANDABLE BORDERS (glider continues):")
    game_expand = GameOfLife(width=8, height=8, expandable=True, max_size=15)
    game_expand.initialize_pattern("glider")
    game_expand.run_simulation(generations=12, delay=0.4)

def interactive_demo():
    """Let user choose pattern and settings"""
    print("\n" + "="*60)
    print("INTERACTIVE GAME OF LIFE DEMO")
    print("="*60)
    
    # Get grid size
    while True:
        try:
            width = int(input("Enter grid width (default 20): ") or "20")
            height = int(input("Enter grid height (default 15): ") or "15")
            if width > 0 and height > 0:
                break
            else:
                print("Please enter positive numbers.")
        except ValueError:
            print("Please enter valid numbers.")
    
    # Get border type
    border_choice = input("Use expandable borders? (y/n, default n): ").lower()
    expandable = border_choice == 'y'
    
    # Get pattern
    print("\nAvailable patterns:")
    patterns = {
        '1': ('glider', 'Glider'),
        '2': ('blinker', 'Blinker'),
        '3': ('block', 'Block'),
        '4': ('beacon', 'Beacon'),
        '5': ('random_dense', 'Random')
    }
    
    for key, (pattern, name) in patterns.items():
        print(f"{key}. {name}")
    
    pattern_choice = input("Choose pattern (1-5, default 1): ") or "1"
    pattern = patterns.get(pattern_choice, ['glider'])[0]
    
    # Create and run game
    game = GameOfLife(width=width, height=height, expandable=expandable)
    game.initialize_pattern(pattern)
    
    generations = int(input("Number of generations (default 30): ") or "30")
    delay = float(input("Delay between generations in seconds (default 0.3): ") or "0.3")
    
    game.run_simulation(generations=generations, delay=delay)

if __name__ == "__main__":
    # Run demonstrations
    demo_different_patterns()
    
    # Compare border types
    compare_border_types()
    
    # Interactive demo
    interactive_demo()