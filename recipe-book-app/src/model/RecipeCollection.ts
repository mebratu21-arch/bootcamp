
import RecipeItem from './RecipeItem';

export default class RecipeCollection {
    private _recipes: RecipeItem[] = [];

    constructor() {
        this.load();
    }

    get recipes(): RecipeItem[] {
        return this._recipes;
    }

    addRecipe(recipe: RecipeItem): void {
        this._recipes.push(recipe);
        this.save();
    }

    removeRecipe(id: string): void {
        this._recipes = this._recipes.filter(r => r.id !== id);
        this.save();
    }

    toggleFavorite(id: string): void {
        const recipe = this._recipes.find(r => r.id === id);
        if (recipe) {
            recipe.isFavorite = !recipe.isFavorite;
            this.save();
        }
    }

    save(): void {
        localStorage.setItem('myRecipes', JSON.stringify(this._recipes));
    }

    load(): void {
        const stored = localStorage.getItem('myRecipes');
        if (stored) {
            const parsed = JSON.parse(stored);
            // Reconstruct RecipeItem instances to ensure they are instances of the class
            this._recipes = parsed.map((item: any) => new RecipeItem(item.id, item.title, item.ingredients, item.instructions, item.isFavorite));
        }
    }
}
