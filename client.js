document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");
  const mealDetailsContent = document.querySelector(".meal-details-content");

  searchBtn.addEventListener("click", async () => {
    const input = searchInput.value.trim();
    if (input.length === 0) {
      mealDetailsContent.innerHTML = "";
      return;
    }

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
          input
        )}&apiKey=7e8fb5d6e82849a989bfa354fa243b89`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const suggestions = await response.json();

      renderSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  });

  function renderSuggestions(suggestions) {
    mealDetailsContent.innerHTML = "";
    suggestions.forEach((suggestion) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");

      const recipeTitle = document.createElement("div");
      recipeTitle.classList.add("recipe-title");
      recipeTitle.textContent = suggestion.title;

      const recipeImage = document.createElement("img");
      recipeImage.src = suggestion.image;
      recipeImage.alt = suggestion.title;

      recipeDiv.appendChild(recipeTitle);
      recipeDiv.appendChild(recipeImage);

      recipeDiv.addEventListener("click", async () => {
        try {
          const recipeDetailsResponse = await fetch(
            `https://api.spoonacular.com/recipes/${suggestion.id}/information?includeNutrition=true&apiKey=7e8fb5d6e82849a989bfa354fa243b89`
          );
          const recipeDetails = await recipeDetailsResponse.json();
          renderRecipeDetails(recipeDetails);
        } catch (error) {
          console.error("Error fetching recipe details:", error);
        }
      });

      mealDetailsContent.appendChild(recipeDiv);
    });
  }

  function renderRecipeDetails(recipe) {
    mealDetailsContent.innerHTML = ""; // Clear previous content

    const recipeDetailsDiv = document.createElement("div");
    recipeDetailsDiv.classList.add("recipe-details");

    const recipeTitle = document.createElement("h2");
    recipeTitle.textContent = recipe.title;

    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.title;

    const recipeInstructions = document.createElement("p");
    recipeInstructions.textContent = recipe.instructions;

    const nutritionFacts = document.createElement("div");
    nutritionFacts.classList.add("nutrition-facts");
    nutritionFacts.innerHTML = "<h3>Nutritional Facts</h3>";

// Display nutritional information
for (const nutrient of recipe.nutrition.nutrients) {
  const nutrientElement = document.createElement("p");
  nutrientElement.textContent = `${nutrient.name}: ${nutrient.amount} ${nutrient.unit}`;
  nutritionFacts.appendChild(nutrientElement);
}



    recipeDetailsDiv.appendChild(recipeTitle);
    recipeDetailsDiv.appendChild(recipeImage);
    recipeDetailsDiv.appendChild(recipeInstructions);
    recipeDetailsDiv.appendChild(nutritionFacts);

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
      mealDetailsContent.innerHTML = "";
      renderSuggestions(savedSuggestions); // Re-render the original suggestions
    });

    mealDetailsContent.appendChild(recipeDetailsDiv);
    mealDetailsContent.appendChild(closeButton);
  }
});
