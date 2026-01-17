
import RecipeItem from '../model/RecipeItem';
import RecipeCollection from '../model/RecipeCollection';

export default class RecipeTemplate {
    private container: HTMLElement;

    constructor(
        containerId: string, 
        private collection: RecipeCollection
    ) {
        const el = document.getElementById(containerId);
        if (!el) throw new Error(`Element with id ${containerId} not found`);
        this.container = el;
    }

    render(): void {
        this.clear();
        this.collection.recipes.forEach(recipe => {
            const card = this.createRecipeCard(recipe);
            this.container.appendChild(card);
        });
    }

    private clear(): void {
        this.container.innerHTML = '';
    }

    private createRecipeCard(recipe: RecipeItem): HTMLElement {
        const div = document.createElement('div');
        div.className = 'recipe-card';
        if (recipe.isFavorite) {
            div.classList.add('favorite-card'); // Using a different class name for clarity
        }
        
        // Title
        const title = document.createElement('h3');
        title.textContent = recipe.title;

        // Details Section (Hidden by default)
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'recipe-details';
        detailsDiv.style.display = 'none';

        const ingredientsTitle = document.createElement('h4');
        ingredientsTitle.textContent = 'Ingredients:';
        
        const ingredientsList = document.createElement('ul');
        recipe.ingredients.forEach(ing => {
            const li = document.createElement('li');
            li.textContent = ing;
            ingredientsList.appendChild(li);
        });

        const instructionsTitle = document.createElement('h4');
        instructionsTitle.textContent = 'Instructions:';

        const instructionsP = document.createElement('p');
        instructionsP.textContent = recipe.instructions;

        detailsDiv.appendChild(ingredientsTitle);
        detailsDiv.appendChild(ingredientsList);
        detailsDiv.appendChild(instructionsTitle);
        detailsDiv.appendChild(instructionsP);

        // Buttons
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';

        // Toggle Details Button
        const toggleDetailsBtn = document.createElement('button');
        toggleDetailsBtn.textContent = 'Show Details';
        toggleDetailsBtn.onclick = () => {
            const isHidden = detailsDiv.style.display === 'none';
            detailsDiv.style.display = isHidden ? 'block' : 'none';
            toggleDetailsBtn.textContent = isHidden ? 'Hide Details' : 'Show Details';
        };

        // Favorite Button
        const favBtn = document.createElement('button');
        favBtn.textContent = recipe.isFavorite ? 'Unfavorite' : 'Favorite';
        favBtn.className = recipe.isFavorite ? 'fav-btn active' : 'fav-btn';
        favBtn.onclick = () => {
            this.collection.toggleFavorite(recipe.id);
            this.render(); // Re-render to update UI
        };

        // Delete Button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className = 'delete-btn';
        delBtn.onclick = () => {
            if(confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
                this.collection.removeRecipe(recipe.id);
                this.render();
            }
        };

        buttonGroup.appendChild(toggleDetailsBtn);
        buttonGroup.appendChild(favBtn);
        buttonGroup.appendChild(delBtn);

        div.appendChild(title);
        div.appendChild(detailsDiv);
        div.appendChild(buttonGroup);

        return div;
    }
}
