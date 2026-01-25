import { RecipeItem } from './RecipeItem';

export class RecipeCollection {
  private recipes: RecipeItem[] = [];
  private static STORAGE_KEY = 'recipeCollection';

  constructor() {
    this.loadFromStorage();
  }

  addRecipe(recipe: RecipeItem): void {
    this.recipes.push(recipe);
    this.saveToStorage();
  }

  removeRecipe(id: string): void {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.saveToStorage();
  }

  toggleFavorite(id: string): void {
    const recipe = this.recipes.find(recipe => recipe.id === id);
    if (recipe) {
      recipe.toggleFavorite();
      this.saveToStorage();
    }
  }

  getRecipes(): RecipeItem[] {
    return this.recipes;
  }

  clearAll(): void {
    this.recipes = [];
    this.saveToStorage();
  }

  private saveToStorage(): void {
    const recipesData = this.recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      isFavorite: recipe.isFavorite
    }));
    localStorage.setItem(RecipeCollection.STORAGE_KEY, JSON.stringify(recipesData));
  }

  private loadFromStorage(): void {
    const storedData = localStorage.getItem(RecipeCollection.STORAGE_KEY);
    if (storedData) {
      try {
        const recipesData = JSON.parse(storedData);
        this.recipes = recipesData.map((data: any) => 
          new RecipeItem(
            data.title,
            data.ingredients,
            data.instructions,
            data.isFavorite,
            data.id
          )
        );
      } catch (error) {
        console.error('Failed to load recipes from storage:', error);
        this.recipes = [];
      }
    }
  }
}
