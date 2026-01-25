import { RecipeItem } from '../model/RecipeItem';

export class RecipeTemplate {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  // Render single recipe card
  renderRecipeCard(recipe: RecipeItem): HTMLElement {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.dataset.recipeId = recipe.id;

    card.innerHTML = `
      <div class="recipe-header">
        <h3 class="recipe-title">${this.escapeHtml(recipe.title)}</h3>
        <div class="recipe-actions">
          <button class="btn-favorite ${recipe.isFavorite ? 'active' : ''}" 
                  data-id="${recipe.id}" 
                  title="${recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
            ${recipe.isFavorite ? '★' : '☆'}
          </button>
          <button class="btn-delete" data-id="${recipe.id}" title="Delete recipe">
            🗑️
          </button>
        </div>
      </div>

      <div class="recipe-details">
        <div class="ingredients-section">
          <h4>Ingredients:</h4>
          <ul class="ingredients-list">
            ${recipe.ingredients.map(ing => `<li>${this.escapeHtml(ing)}</li>`).join('')}
          </ul>
        </div>

        <div class="instructions-section">
          <h4>Instructions:</h4>
          <p class="instructions-text">${this.escapeHtml(recipe.instructions)}</p>
        </div>
      </div>

      <button class="btn-toggle-details" data-id="${recipe.id}">
        <span class="toggle-text">Show Details</span>
        <span class="toggle-icon">▼</span>
      </button>
    `;

    return card;
  }

  // Render all recipes
  renderRecipeList(recipes: RecipeItem[]): void {
    this.clearContainer();

    if (recipes.length === 0) {
      this.renderEmptyState();
      return;
    }

    const fragment = document.createDocumentFragment();
    recipes.forEach(recipe => {
      fragment.appendChild(this.renderRecipeCard(recipe));
    });

    this.container.appendChild(fragment);
  }

  // Render empty state
  renderEmptyState(): void {
    this.container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🍳</div>
        <h3>No Recipes Yet</h3>
        <p>Start by adding your first recipe above!</p>
      </div>
    `;
  }

  // Clear container
  clearContainer(): void {
    this.container.innerHTML = '';
  }

  // Escape HTML to prevent XSS
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Toggle recipe details visibility
  toggleDetails(recipeId: string): void {
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    if (!card) return;

    const details = card.querySelector('.recipe-details') as HTMLElement;
    const toggleBtn = card.querySelector('.btn-toggle-details') as HTMLElement;
    const toggleText = toggleBtn.querySelector('.toggle-text') as HTMLElement;
    const toggleIcon = toggleBtn.querySelector('.toggle-icon') as HTMLElement;

    if (details.style.display === 'block') {
      details.style.display = 'none';
      toggleText.textContent = 'Show Details';
      toggleIcon.textContent = '▼';
    } else {
      details.style.display = 'block';
      toggleText.textContent = 'Hide Details';
      toggleIcon.textContent = '▲';
    }
  }

  // Update favorite button state
  updateFavoriteButton(recipeId: string, isFavorite: boolean): void {
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    if (!card) return;

    const btn = card.querySelector('.btn-favorite') as HTMLButtonElement;
    btn.textContent = isFavorite ? '★' : '☆';
    btn.title = isFavorite ? 'Remove from favorites' : 'Add to favorites';
    btn.classList.toggle('active', isFavorite);
  }
}
