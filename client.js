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

      mealDetailsContent.appendChild(recipeDiv);
    });
    const closeButton = document.getElementById("recipe-close-btn");
    const shareButton = document.getElementById("shareButton");
    closeButton.style.display = "block";
    shareButton.style.display = "block";
    closeButton.addEventListener("click", () => {
      mealDetailsContent.innerHTML = "";
      closeButton.style.display = "none";
      shareButton.style.display = "none";
    });
  }
  shareButton.addEventListener("click", () => {
    const input = searchInput.value.trim();
    window.location.href = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
      input
    )}&apiKey=7e8fb5d6e82849a989bfa354fa243b89`;
  });
});
