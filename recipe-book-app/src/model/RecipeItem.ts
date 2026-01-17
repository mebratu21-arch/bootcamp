
export interface IRecipe {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string;
    isFavorite: boolean;
}

export default class RecipeItem implements IRecipe {
    constructor(
        public id: string,
        public title: string,
        public ingredients: string[],
        public instructions: string,
        public isFavorite: boolean = false
    ) {}
}
