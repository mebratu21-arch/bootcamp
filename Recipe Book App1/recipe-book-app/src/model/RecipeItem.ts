import { v4 as uuidv4 } from 'uuid';

export class RecipeItem {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;

  constructor(
    title: string,
    ingredients: string[],
    instructions: string,
    isFavorite: boolean = false,
    id: string = uuidv4()
  ) {
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.isFavorite = isFavorite;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
}
