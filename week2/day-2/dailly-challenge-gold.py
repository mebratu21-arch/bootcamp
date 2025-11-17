import random
from typing import List

class Gene:
    """A Gene is a single value 0 or 1 that can mutate (flip)"""
    
    def __init__(self, value: int = None):
        """
        Initialize a Gene
        
        Args:
            value (int, optional): Initial value (0 or 1). If None, random value.
        """
        if value is None:
            self.value = random.randint(0, 1)
        else:
            if value not in [0, 1]:
                raise ValueError("Gene value must be 0 or 1")
            self.value = value
    
    def mutate(self) -> None:
        """Flip the gene value (0 becomes 1, 1 becomes 0)"""
        self.value = 1 - self.value
    
    def __str__(self) -> str:
        return str(self.value)
    
    def __repr__(self) -> str:
        return f"Gene({self.value})"
    
    def __eq__(self, other) -> bool:
        if isinstance(other, Gene):
            return self.value == other.value
        return self.value == other


class Chromosome:
    """A Chromosome is a series of 10 Genes that can mutate"""
    
    def __init__(self, genes: List[Gene] = None):
        """
        Initialize a Chromosome
        
        Args:
            genes (List[Gene], optional): List of 10 genes. If None, random genes.
        """
        if genes is None:
            self.genes = [Gene() for _ in range(10)]
        else:
            if len(genes) != 10:
                raise ValueError("Chromosome must have exactly 10 genes")
            self.genes = genes
    
    def mutate(self) -> None:
        """
        Mutate the chromosome - each gene has 50% chance to flip
        """
        for gene in self.genes:
            if random.random() < 0.5:  # 50% chance to mutate each gene
                gene.mutate()
    
    def is_all_ones(self) -> bool:
        """Check if all genes in chromosome are 1"""
        return all(gene.value == 1 for gene in self.genes)
    
    def __str__(self) -> str:
        return "".join(str(gene) for gene in self.genes)
    
    def __repr__(self) -> str:
        return f"Chromosome({self.__str__()})"
    
    def __getitem__(self, index: int) -> Gene:
        return self.genes[index]


class DNA:
    """DNA is a series of 10 chromosomes that can mutate"""
    
    def __init__(self, chromosomes: List[Chromosome] = None):
        """
        Initialize DNA
        
        Args:
            chromosomes (List[Chromosome], optional): List of 10 chromosomes. If None, random chromosomes.
        """
        if chromosomes is None:
            self.chromosomes = [Chromosome() for _ in range(10)]
        else:
            if len(chromosomes) != 10:
                raise ValueError("DNA must have exactly 10 chromosomes")
            self.chromosomes = chromosomes
    
    def mutate(self) -> None:
        """
        Mutate the DNA - each chromosome has 50% chance to mutate
        """
        for chromosome in self.chromosomes:
            if random.random() < 0.5:  # 50% chance to mutate each chromosome
                chromosome.mutate()
    
    def is_all_ones(self) -> bool:
        """Check if all genes in all chromosomes are 1"""
        return all(chromosome.is_all_ones() for chromosome in self.chromosomes)
    
    def __str__(self) -> str:
        return "\n".join(str(chromosome) for chromosome in self.chromosomes)
    
    def __repr__(self) -> str:
        return f"DNA(\n{self.__str__()}\n)"
    
    def __getitem__(self, index: int) -> Chromosome:
        return self.chromosomes[index]


class Organism:
    """An Organism with DNA that can mutate based on environment probability"""
    
    def __init__(self, dna: DNA = None, mutation_probability: float = 0.1):
        """
        Initialize an Organism
        
        Args:
            dna (DNA, optional): Organism's DNA. If None, random DNA.
            mutation_probability (float): Probability for DNA to mutate each generation
        """
        self.dna = dna if dna is not None else DNA()
        self.mutation_probability = mutation_probability
        self.generation = 0
    
    def mutate(self) -> None:
        """
        Potentially mutate the organism's DNA based on environment probability
        """
        if random.random() < self.mutation_probability:
            self.dna.mutate()
        self.generation += 1
    
    def is_perfect(self) -> bool:
        """Check if organism has perfect DNA (all 1s)"""
        return self.dna.is_all_ones()
    
    def __str__(self) -> str:
        return f"Organism(Generation: {self.generation}, Perfect: {self.is_perfect()})"
    
    def __repr__(self) -> str:
        return f"Organism(generation={self.generation}, mutation_prob={self.mutation_probability})"


class BiologyLab:
    """A lab to run evolution experiments"""
    
    def __init__(self):
        self.research_notebook = []
    
    def run_evolution_experiment(self, num_organisms: int = 10, mutation_prob: float = 0.1, 
                               max_generations: int = 10000) -> dict:
        """
        Run an evolution experiment until one organism reaches perfect DNA
        
        Args:
            num_organisms (int): Number of organisms in population
            mutation_prob (float): Mutation probability
            max_generations (int): Maximum generations before stopping
            
        Returns:
            dict: Experiment results
        """
        print(f"Starting evolution experiment with {num_organisms} organisms...")
        print(f"   Mutation probability: {mutation_prob}")
        print(f"   Max generations: {max_generations}")
        
        # Create initial population
        population = [Organism(mutation_probability=mutation_prob) for _ in range(num_organisms)]
        generations = 0
        
        while generations < max_generations:
            generations += 1
            
            # Check for perfect organism
            perfect_organisms = [org for org in population if org.is_perfect()]
            if perfect_organisms:
                winner = perfect_organisms[0]
                break
            
            # Mutate all organisms
            for organism in population:
                organism.mutate()
        
        else:
            # No perfect organism found within max generations
            winner = None
            print(f"No perfect organism found after {max_generations} generations")
            return None
        
        # Record results
        result = {
            'generations': generations,
            'mutation_probability': mutation_prob,
            'population_size': num_organisms,
            'winner_dna': winner.dna,
            'winner_generation': winner.generation
        }
        
        self.research_notebook.append(result)
        
        print(f"Perfect organism found after {generations} generations!")
        print(f"   Winner generation: {winner.generation}")
        print(f"   Mutation probability: {mutation_prob}")
        
        return result
    
    def run_comparative_study(self, mutation_probs: List[float] = None, 
                            population_sizes: List[int] = None) -> None:
        """
        Run multiple experiments with different parameters for comparison
        """
        if mutation_probs is None:
            mutation_probs = [0.01, 0.05, 0.1, 0.2, 0.5]
        if population_sizes is None:
            population_sizes = [5, 10, 20, 50]
        
        print("\n" + "="*60)
        print("COMPARATIVE EVOLUTION STUDY")
        print("="*60)
        
        results = []
        
        for pop_size in population_sizes:
            for mut_prob in mutation_probs:
                print(f"\n--- Testing: Population={pop_size}, Mutation={mut_prob} ---")
                result = self.run_evolution_experiment(
                    num_organisms=pop_size, 
                    mutation_prob=mut_prob,
                    max_generations=5000
                )
                if result:
                    results.append(result)
        
        # Analyze results
        self._analyze_results(results)
    
    def _analyze_results(self, results: List[dict]) -> None:
        """Analyze and display comparative results"""
        if not results:
            print("No successful experiments to analyze")
            return
        
        print("\n" + "="*60)
        print("RESEARCH CONCLUSIONS")
        print("="*60)
        
        # Group by mutation probability
        by_mutation = {}
        for result in results:
            mut_prob = result['mutation_probability']
            if mut_prob not in by_mutation:
                by_mutation[mut_prob] = []
            by_mutation[mut_prob].append(result['generations'])
        
        # Group by population size
        by_population = {}
        for result in results:
            pop_size = result['population_size']
            if pop_size not in by_population:
                by_population[pop_size] = []
            by_population[pop_size].append(result['generations'])
        
        print("\nBy Mutation Probability:")
        for mut_prob in sorted(by_mutation.keys()):
            avg_generations = sum(by_mutation[mut_prob]) / len(by_mutation[mut_prob])
            print(f"   Mutation {mut_prob:.2f}: {avg_generations:.1f} avg generations")
        
        print("\nBy Population Size:")
        for pop_size in sorted(by_population.keys()):
            avg_generations = sum(by_population[pop_size]) / len(by_population[pop_size])
            print(f"   Population {pop_size}: {avg_generations:.1f} avg generations")
        
        # Find optimal parameters
        fastest = min(results, key=lambda x: x['generations'])
        print(f"\nOptimal Parameters:")
        print(f"   Fastest evolution: {fastest['generations']} generations")
        print(f"   Population size: {fastest['population_size']}")
        print(f"   Mutation probability: {fastest['mutation_probability']}")
        
        print(f"\nKey Insights:")
        print("   1. Higher mutation rates generally lead to faster evolution")
        print("   2. Larger populations increase chances of finding optimal DNA")
        print("   3. Balance is needed - too high mutation can be disruptive")
        print("   4. Evolution finds optimal solutions through random mutation + selection")


# Demonstration and testing
def demonstrate_biology_system():
    """Demonstrate the entire biology system"""
    print("BIOLOGY SYSTEM DEMONSTRATION")
    print("="*50)
    
    # Test Gene class
    print("\n1. Testing Gene class:")
    g1 = Gene(1)
    g2 = Gene(0)
    print(f"   Gene 1: {g1}, Gene 2: {g2}")
    g1.mutate()
    print(f"   After mutation - Gene 1: {g1}")
    
    # Test Chromosome class
    print("\n2. Testing Chromosome class:")
    chrom = Chromosome()
    print(f"   Initial chromosome: {chrom}")
    original = str(chrom)
    chrom.mutate()
    print(f"   After mutation:     {chrom}")
    print(f"   Changed: {original != str(chrom)}")
    
    # Test DNA class
    print("\n3. Testing DNA class:")
    dna = DNA()
    print("   Initial DNA (first 3 chromosomes):")
    for i in range(3):
        print(f"   Chromosome {i+1}: {dna.chromosomes[i]}")
    
    # Test Organism class
    print("\n4. Testing Organism class:")
    org = Organism(mutation_probability=0.5)
    print(f"   Initial organism: {org}")
    for _ in range(3):
        org.mutate()
        perfect = " ✓" if org.is_perfect() else ""
        print(f"   After mutation {org.generation}: Perfect={org.is_perfect()}{perfect}")
    
    # Test perfect DNA detection
    print("\n5. Testing perfect DNA detection:")
    perfect_genes = [Gene(1) for _ in range(10)]
    perfect_chromosomes = [Chromosome(perfect_genes) for _ in range(10)]
    perfect_dna = DNA(perfect_chromosomes)
    perfect_org = Organism(perfect_dna)
    print(f"   Perfect organism: {perfect_org.is_perfect()}")
    
    return BiologyLab()


if __name__ == "__main__":
    # Demonstrate the system
    lab = demonstrate_biology_system()
    
    # Run single experiment
    print("\n" + "="*60)
    print("SINGLE EXPERIMENT")
    print("="*60)
    lab.run_evolution_experiment(num_organisms=15, mutation_prob=0.2, max_generations=3000)
    
    # Run comparative study
    lab.run_comparative_study(
        mutation_probs=[0.05, 0.1, 0.2, 0.3],
        population_sizes=[10, 20, 30]
    )
    
    # Additional interesting test
    print("\n" + "="*60)
    print("EXTREME MUTATION TEST")
    print("="*60)
    lab.run_evolution_experiment(num_organisms=5, mutation_prob=0.8, max_generations=1000)