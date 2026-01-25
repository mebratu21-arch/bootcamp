import { RecipeItem } from '../model/RecipeItem';

export class RecipeTemplate {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render(recipes: RecipeItem[], onToggleFavorite: (id: string) => void, onDelete: (id: string) => void): void {
    this.container.innerHTML = '';

    if (recipes.length === 0) {
      this.container.innerHTML = '<p class="no-recipes">No recipes yet. Add your first recipe!</p>';
      return;
    }

    recipes.forEach(recipe => {
      const recipeCard = this.createRecipeCard(recipe, onToggleFavorite, onDelete);
      this.container.appendChild(recipeCard);
    });
  }

  private createRecipeCard(
    recipe: RecipeItem,
    onToggleFavorite: (id: string) => void,
    onDelete: (id: string) => void
  ): HTMLElement {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.dataset.recipeId = recipe.id;

    const header = document.createElement('div');
    header.className = 'recipe-header';

    const title = document.createElement('h3');
    title.className = 'recipe-title';
    title.textContent = recipe.title;

    const actions = document.createElement('div');
    actions.className = 'recipe-actions';

    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = `favorite-btn ${recipe.isFavorite ? 'active' : ''}`;
    favoriteBtn.innerHTML = recipe.isFavorite ? '★' : '☆';
    favoriteBtn.title = recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites';
    favoriteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      onToggleFavorite(recipe.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.title = 'Delete recipe';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Delete "${recipe.title}"?`)) {
        onDelete(recipe.id);
      }
    });

    actions.appendChild(favoriteBtn);
    actions.appendChild(deleteBtn);
    header.appendChild(title);
    header.appendChild(actions);

    const content = document.createElement('div');
    content.className = 'recipe-content';

    const ingredientsSection = document.createElement('div');
    ingredientsSection.className = 'ingredients-section';
    const ingredientsTitle = document.createElement('h4');
    ingredientsTitle.textContent = 'Ingredients:';
    const ingredientsList = document.createElement('ul');
    ingredientsList.className = 'ingredients-list';
    recipe.ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
    ingredientsSection.appendChild(ingredientsTitle);
    ingredientsSection.appendChild(ingredientsList);

    const instructionsSection = document.createElement('div');
    instructionsSection.className = 'instructions-section';
    const instructionsTitle = document.createElement('h4');
    instructionsTitle.textContent = 'Instructions:';
    const instructionsText = document.createElement('p');
    instructionsText.className = 'instructions-text';
    instructionsText.textContent = recipe.instructions;
    instructionsSection.appendChild(instructionsTitle);
    instructionsSection.appendChild(instructionsText);

    content.appendChild(ingredientsSection);
    content.appendChild(instructionsSection);

    card.appendChild(header);
    card.appendChild(content);

    return card;
  }
}
