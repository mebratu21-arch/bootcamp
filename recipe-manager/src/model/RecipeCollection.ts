import { RecipeItem } from './RecipeItem';

export class RecipeCollection {
  private _recipes: RecipeItem[] = [];
  private static readonly STORAGE_KEY = 'recipeCollection';

  constructor() {
    this.load();
  }

  // Get all recipes
  getAllRecipes(): RecipeItem[] {
    return [...this._recipes]; // Return copy
  }

  // Get recipe by ID
  getRecipeById(id: string): RecipeItem | undefined {
    return this._recipes.find(recipe => recipe.id === id);
  }

  // Add new recipe
  addRecipe(recipe: RecipeItem): void {
    this._recipes.push(recipe);
    this.save();
  }

  // Remove recipe by ID
  removeRecipe(id: string): boolean {
    const initialLength = this._recipes.length;
    this._recipes = this._recipes.filter(recipe => recipe.id !== id);
    
    if (this._recipes.length < initialLength) {
      this.save();
      return true;
    }
    return false;
  }

  // Toggle favorite status
  toggleFavorite(id: string): boolean {
    const recipe = this.getRecipeById(id);
    if (recipe) {
      recipe.toggleFavorite();
      this.save();
      return true;
    }
    return false;
  }

  // Clear all recipes
  clearAll(): void {
    if (confirm('Are you sure you want to delete all recipes?')) {
      this._recipes = [];
      this.save();
    }
  }

  // Get favorite recipes
  getFavorites(): RecipeItem[] {
    return this._recipes.filter(recipe => recipe.isFavorite);
  }

  // Save to localStorage
  save(): void {
    try {
      const data = JSON.stringify(this._recipes.map(recipe => recipe.toJSON()));
      localStorage.setItem(RecipeCollection.STORAGE_KEY, data);
    } catch (error) {
      console.error('Failed to save recipes to localStorage:', error);
    }
  }

  // Load from localStorage
  load(): void {
    try {
      const data = localStorage.getItem(RecipeCollection.STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        this._recipes = parsed.map((item: any) => RecipeItem.fromJSON(item));
      }
    } catch (error) {
      console.error('Failed to load recipes from localStorage:', error);
      this._recipes = [];
    }
  }

  // Get recipe count
  get count(): number {
    return this._recipes.length;
  }
}
