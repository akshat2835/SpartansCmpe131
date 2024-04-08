const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const apiKey = '22b3313f9c29467bacd1ac91096c9d20';

// event listeners
searchBtn.addEventListener('click', RecipeSr);
mealList.addEventListener('click', RecipeGen);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

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
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://api.spoonacular.com/recipes/${mealItem.dataset.id}/information?apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data));
    }
}

// create a modal
function mealRecipeModal(meal) {
    console.log(meal);
    let html = `
        <h2 class="recipe-title">${meal.title}</h2>
        <p class="recipe-category">Category: ${meal.dishTypes.join(', ')}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.instructions}</p>
        </div>
        <div class="recipe-link">
            <a href="${meal.sourceUrl}" target="_blank">View Recipe</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}