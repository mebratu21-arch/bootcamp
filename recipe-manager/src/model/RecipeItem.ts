import { v4 as uuidv4 } from 'uuid';

export class RecipeItem {
  private _id: string;
  private _title: string;
  private _ingredients: string[];
  private _instructions: string;
  private _isFavorite: boolean;

  constructor(
    title: string,
    ingredients: string[],
    instructions: string,
    isFavorite: boolean = false,
    id: string = uuidv4()
  ) {
    this._id = id;
    this._title = title;
    this._ingredients = ingredients;
    this._instructions = instructions;
    this._isFavorite = isFavorite;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get ingredients(): string[] {
    return [...this._ingredients]; // Return copy to prevent mutation
  }

  get instructions(): string {
    return this._instructions;
  }

  get isFavorite(): boolean {
    return this._isFavorite;
  }

  // Setters with validation
  set title(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }
    this._title = value.trim();
  }

  set ingredients(value: string[]) {
    if (!value || value.length === 0) {
      throw new Error('Recipe must have at least one ingredient');
    }
    this._ingredients = value.filter(item => item.trim().length > 0);
  }

  set instructions(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Instructions cannot be empty');
    }
    this._instructions = value.trim();
  }

  set isFavorite(value: boolean) {
    this._isFavorite = value;
  }

  // Toggle favorite status
  toggleFavorite(): void {
    this._isFavorite = !this._isFavorite;
  }

  // Serialization for localStorage
  toJSON(): object {
    return {
      id: this._id,
      title: this._title,
      ingredients: this._ingredients,
      instructions: this._instructions,
      isFavorite: this._isFavorite,
    };
  }

  // Create instance from JSON
  static fromJSON(data: any): RecipeItem {
    return new RecipeItem(
      data.title,
      data.ingredients,
      data.instructions,
      data.isFavorite,
      data.id
    );
  }
}
