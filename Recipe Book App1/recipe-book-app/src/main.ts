import './style.css';
import { RecipeItem } from './model/RecipeItem';
import { RecipeCollection } from './model/RecipeCollection';
import { RecipeTemplate } from './templates/RecipeTemplate';

// Initialize the application
const recipeCollection = new RecipeCollection();
const recipeContainer = document.querySelector<HTMLDivElement>('#recipeContainer')!;
const recipeTemplate = new RecipeTemplate(recipeContainer);

// Render initial recipes
renderRecipes();

// Form submission handler
const form = document.querySelector<HTMLFormElement>('#recipeEntryForm')!;
form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  
  const titleInput = document.querySelector<HTMLInputElement>('#recipeTitle')!;
  const ingredientsInput = document.querySelector<HTMLTextAreaElement>('#ingredients')!;
  const instructionsInput = document.querySelector<HTMLTextAreaElement>('#instructions')!;
  
  const title = titleInput.value.trim();
  const ingredientsText = ingredientsInput.value.trim();
  const instructions = instructionsInput.value.trim();
  
  if (!title || !ingredientsText || !instructions) {
    alert('Please fill in all fields');
    return;
  }
  
  // Parse ingredients (one per line)
  const ingredients = ingredientsText
    .split('\n')
    .map(ing => ing.trim())
    .filter(ing => ing.length > 0);
  
  if (ingredients.length === 0) {
    alert('Please add at least one ingredient');
    return;
  }
  
  // Create and add new recipe
  const newRecipe = new RecipeItem(title, ingredients, instructions);
  recipeCollection.addRecipe(newRecipe);
  
  // Clear form
  form.reset();
  
  // Re-render recipes
  renderRecipes();
});

// Clear all button handler
const clearButton = document.querySelector<HTMLButtonElement>('#clearRecipesButton')!;
clearButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all recipes?')) {
    recipeCollection.clearAll();
    renderRecipes();
  }
});

// Render function
function renderRecipes() {
  const recipes = recipeCollection.getRecipes();
  recipeTemplate.render(
    recipes,
    (id: string) => {
      recipeCollection.toggleFavorite(id);
      renderRecipes();
    },
    (id: string) => {
      recipeCollection.removeRecipe(id);
      renderRecipes();
    }
  );
}
