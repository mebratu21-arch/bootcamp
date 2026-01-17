
import './style.css'
import { v4 as uuidv4 } from 'uuid';
import RecipeItem from './model/RecipeItem';
import RecipeCollection from './model/RecipeCollection';
import RecipeTemplate from './templates/RecipeTemplate';

const collection = new RecipeCollection();
const template = new RecipeTemplate('recipeContainer', collection);

// Initial render to show any saved recipes
template.render();

const form = document.getElementById('recipeEntryForm') as HTMLFormElement;

if (form) {
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const titleInput = document.getElementById('recipeTitle') as HTMLInputElement;
        const ingredientsInput = document.getElementById('ingredients') as HTMLTextAreaElement;
        const instructionsInput = document.getElementById('instructions') as HTMLTextAreaElement;

        const title = titleInput.value.trim();
        // Split by new line and filter empty lines
        const ingredients = ingredientsInput.value.trim().split('\n').map(i => i.trim()).filter(i => i.length > 0);
        const instructions = instructionsInput.value.trim();

        if (!title || ingredients.length === 0 || !instructions) {
            alert('Please fill in all fields');
            return;
        }

        const newRecipe = new RecipeItem(
            uuidv4(),
            title,
            ingredients,
            instructions,
            false
        );

        collection.addRecipe(newRecipe);
        template.render();

        form.reset();
    });
}

const clearBtn = document.getElementById('clearRecipesButton') as HTMLButtonElement;
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
       if (confirm('Are you sure you want to clear all recipes?')) {
           // Create a copy of the array to iterate over while modifying the original
           [...collection.recipes].forEach(recipe => collection.removeRecipe(recipe.id));
           template.render();
       }
    });
}
