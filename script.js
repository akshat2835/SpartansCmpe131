const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const apiKey = '22b3313f9c29467bacd1ac91096c9d20';

// event listeners
searchBtn.addEventListener('click', RecipeSr);
mealList.addEventListener('click', RecipeGen);

// get meal list that matches with the ingredients using Spoonacular API
function RecipeSr() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchInputTxt}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data && data.length > 0) {
                data.forEach(meal => {
                    html += `
                        <div class="meal-item" data-id="${meal.id}">
                            <div class="meal-name">
                                <h3>${meal.title}</h3>
                                <img src="${meal.image}" alt="${meal.title}" class="meal-image">
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}

// get recipe of the meal using Spoonacular API
function RecipeGen(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let recipeBtn = e.target;
        let mealItem = recipeBtn.parentElement.parentElement;
        fetch(`https://api.spoonacular.com/recipes/${mealItem.dataset.id}/information?apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data, recipeBtn));
    }
}

// create a modal
function mealRecipeModal(meal, button) {
    let modal = document.createElement('div');
    modal.classList.add('meal-modal');

    // Apply CSS styles to position the modal
    modal.style.position = 'absolute';
    modal.style.zIndex = '1000';
    modal.style.backgroundColor = '#fff';
    modal.style.border = '1px solid #ccc';
    modal.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    
    let html = `
        <h2 class="recipe-title">${meal.title}</h2>
        <div class="recipe-image">
            <img src="${meal.image}" alt="${meal.title}">
        </div>
        <p class="recipe-category">Category: ${meal.dishTypes.join(', ')}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.instructions}</p>
        </div>
        <div class="recipe-link">
            <a href="${meal.sourceUrl}" target="_blank">View Recipe</a>
        </div>
    `;
    modal.innerHTML = html;
    
    // Position the modal underneath the clicked button
    let buttonRect = button.getBoundingClientRect();
    modal.style.top = `${buttonRect.bottom + window.scrollY}px`;
    modal.style.left = `${buttonRect.left}px`;
    
    // Append modal to the document body
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (!modal.contains(event.target) && event.target !== button) {
            modal.remove();
        }
    });
}
