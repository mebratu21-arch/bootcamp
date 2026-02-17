export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
  createdAt: number;
}

export interface AppState {
  recipes: Recipe[];
  filter: 'all' | 'favorites';
}
