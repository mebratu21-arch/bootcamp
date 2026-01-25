import './style.css';
import { RecipeItem } from './model/RecipeItem';
import { RecipeCollection } from './model/RecipeCollection';
import { RecipeTemplate } from './templates/RecipeTemplate';

// Initialize collection and template
const collection = new RecipeCollection();
const container = document.querySelector<HTMLDivElement>('#recipeContainer')!;
const template = new RecipeTemplate(container);

// Get form elements
const form = document.querySelector<HTMLFormElement>('#recipeEntryForm')!;
const titleInput = document.querySelector<HTMLInputElement>('#recipeTitle')!;
const ingredientsInput = document.querySelector<HTMLTextAreaElement>('#ingredients')!;
const instructionsInput = document.querySelector<HTMLTextAreaElement>('#instructions')!;
const clearButton = document.querySelector<HTMLButtonElement>('#clearRecipesButton')!;

// Initial render
renderRecipes();

// Handle form submission
form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  try {
    const title = titleInput.value.trim();
    const ingredientsText = ingredientsInput.value.trim();
    const instructions = instructionsInput.value.trim();

    // Validate
    if (!title || !ingredientsText || !instructions) {
      alert('Please fill in all fields');
      return;
    }

    // Parse ingredients (one per line)
    const ingredients = ingredientsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (ingredients.length === 0) {
      alert('Please enter at least one ingredient');
      return;
    }

    // Create and add recipe
    const recipe = new RecipeItem(title, ingredients, instructions);
    collection.addRecipe(recipe);

    // Reset form
    form.reset();

    // Re-render
    renderRecipes();

    // Show success message
    showNotification('Recipe added successfully! 🎉');
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error: ${error.message}`);
    }
  }
});

// Handle clear all button
clearButton.addEventListener('click', () => {
  collection.clearAll();
  renderRecipes();
});

// Event delegation for recipe actions
container.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;

  // Toggle favorite
  if (target.classList.contains('btn-favorite')) {
    const id = target.dataset.id;
    if (id) {
      const recipe = collection.getRecipeById(id);
      if (recipe) {
        collection.toggleFavorite(id);
        template.updateFavoriteButton(id, recipe.isFavorite);
      }
    }
  }

  // Delete recipe
  if (target.classList.contains('btn-delete')) {
    const id = target.dataset.id;
    if (id && confirm('Are you sure you want to delete this recipe?')) {
      collection.removeRecipe(id);
      renderRecipes();
      showNotification('Recipe deleted');
    }
  }

  // Toggle details
  if (target.classList.contains('btn-toggle-details') || target.closest('.btn-toggle-details')) {
    const btn = target.closest('.btn-toggle-details') as HTMLElement;
    const id = btn?.dataset.id;
    if (id) {
      template.toggleDetails(id);
    }
  }
});

// Render recipes
function renderRecipes(): void {
  const recipes = collection.getAllRecipes();
  template.renderRecipeList(recipes);
  updateStats();
}

// Update statistics
function updateStats(): void {
  const statsEl = document.querySelector('#stats');
  if (statsEl) {
    const total = collection.count;
    const favorites = collection.getFavorites().length;
    statsEl.textContent = `Total: ${total} | Favorites: ${favorites}`;
  }
}

// Show notification
function showNotification(message: string): void {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}
