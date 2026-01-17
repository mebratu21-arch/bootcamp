import './style.css';
import type { Recipe, AppState } from './types';
import { saveRecipes, loadRecipes, generateId } from './storage';

// App State
const state: AppState = {
  recipes: loadRecipes(),
  filter: 'all'
};

// DOM Elements
const recipeForm = document.querySelector('#recipe-form') as HTMLFormElement;
const recipesContainer = document.querySelector('#recipes-container') as HTMLDivElement;
const filterButtons = document.querySelectorAll('.btn-filter');
const ingredientsList = document.querySelector('#ingredients-list') as HTMLDivElement;
const addIngredientBtn = document.querySelector('#add-ingredient') as HTMLButtonElement;

// Initialize
function init() {
  renderRecipes();
  attachEventListeners();
}

// Event Listeners
function attachEventListeners() {
  recipeForm.addEventListener('submit', handleAddRecipe);
  addIngredientBtn.addEventListener('click', addIngredientInput);
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const filter = target.dataset.filter as 'all' | 'favorites';
      setFilter(filter);
    });
  });
  
  // Add initial ingredient input
  addIngredientInput();
}

// Add Ingredient Input
function addIngredientInput() {
  const inputGroup = document.createElement('div');
  inputGroup.className = 'ingredient-input-group';
  inputGroup.innerHTML = `
    <input type="text" class="ingredient-input" placeholder="e.g., 2 cups flour" required>
    <button type="button" class="btn-remove-ingredient" onclick="this.parentElement.remove()">✕</button>
  `;
  ingredientsList.appendChild(inputGroup);
}

// Handle Add Recipe
function handleAddRecipe(e: Event) {
  e.preventDefault();
  
  const formData = new FormData(recipeForm);
  const title = formData.get('title') as string;
  const instructions = formData.get('instructions') as string;
  
  const ingredientInputs = document.querySelectorAll('.ingredient-input') as NodeListOf<HTMLInputElement>;
  const ingredients = Array.from(ingredientInputs)
    .map(input => input.value.trim())
    .filter(val => val !== '');
  
  if (ingredients.length === 0) {
    alert('Please add at least one ingredient');
    return;
  }
  
  const newRecipe: Recipe = {
    id: generateId(),
    title,
    ingredients,
    instructions,
    isFavorite: false,
    createdAt: Date.now()
  };
  
  state.recipes.unshift(newRecipe);
  saveRecipes(state.recipes);
  
  recipeForm.reset();
  ingredientsList.innerHTML = '';
  addIngredientInput();
  
  renderRecipes();
}

// Toggle Favorite
function toggleFavorite(id: string) {
  const recipe = state.recipes.find(r => r.id === id);
  if (recipe) {
    recipe.isFavorite = !recipe.isFavorite;
    saveRecipes(state.recipes);
    renderRecipes();
  }
}

// Delete Recipe
function deleteRecipe(id: string) {
  if (confirm('Are you sure you want to delete this recipe?')) {
    state.recipes = state.recipes.filter(r => r.id !== id);
    saveRecipes(state.recipes);
    renderRecipes();
  }
}

// Set Filter
function setFilter(filter: 'all' | 'favorites') {
  state.filter = filter;
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderRecipes();
}

// Render Recipes
function renderRecipes() {
  const filteredRecipes = state.filter === 'all' 
    ? state.recipes 
    : state.recipes.filter(r => r.isFavorite);
  
  if (filteredRecipes.length === 0) {
    recipesContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🍳</div>
        <h3>${state.filter === 'favorites' ? 'No Favorite Recipes' : 'No Recipes Yet'}</h3>
        <p>${state.filter === 'favorites' ? 'Star some recipes to see them here!' : 'Add your first recipe to get started!'}</p>
      </div>
    `;
    return;
  }
  
  recipesContainer.innerHTML = filteredRecipes.map(recipe => `
    <div class="recipe-card ${recipe.isFavorite ? 'favorite' : ''}" data-id="${recipe.id}">
      <div class="recipe-header">
        <h3>${escapeHtml(recipe.title)}</h3>
        <div class="recipe-actions">
          <button class="btn-icon btn-favorite ${recipe.isFavorite ? 'active' : ''}" 
                  onclick="window.toggleFavorite('${recipe.id}')" 
                  title="${recipe.isFavorite ? 'Unfavorite' : 'Favorite'}">
            ${recipe.isFavorite ? '★' : '☆'}
          </button>
          <button class="btn-icon btn-delete" 
                  onclick="window.deleteRecipe('${recipe.id}')" 
                  title="Delete">
            🗑️
          </button>
        </div>
      </div>
      
      <div class="recipe-section">
        <h4>Ingredients</h4>
        <ul class="ingredients-list">
          ${recipe.ingredients.map(ing => `<li>${escapeHtml(ing)}</li>`).join('')}
        </ul>
      </div>
      
      <div class="recipe-section">
        <h4>Instructions</h4>
        <p class="instructions">${escapeHtml(recipe.instructions)}</p>
      </div>
      
      <div class="recipe-meta">
        <span>Created ${formatDate(recipe.createdAt)}</span>
      </div>
    </div>
  `).join('');
}

// Utility Functions
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
}

// Expose functions to window for onclick handlers
declare global {
  interface Window {
    toggleFavorite: (id: string) => void;
    deleteRecipe: (id: string) => void;
  }
}

window.toggleFavorite = toggleFavorite;
window.deleteRecipe = deleteRecipe;

// Initialize app
init();
