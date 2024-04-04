// client.js

// Function to fetch and display suggestions based on user input
async function displaySuggestions(input) {
    try {
        const response = await fetch(`/api/suggestions?input=${encodeURIComponent(input)}`);
        const suggestions = await response.json();
        
        // Get the suggestion list container
        const suggestionList = document.getElementById('suggestionList');
        
        // Clear previous suggestions
        suggestionList.innerHTML = '';

        // Display new suggestions
        suggestions.forEach(suggestion => {
            const listItem = document.createElement('li');
            listItem.textContent = suggestion.name;
            suggestionList.appendChild(listItem);
        });

        // Show the suggestion list
        suggestionList.style.display = 'block';
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Get input element
    const ingredientInput = document.getElementById('ingredientInput');
    // Get suggestion list container
    const suggestionList = document.getElementById('suggestionList');

    // Event listener to fetch suggestions as user types
    ingredientInput.addEventListener('input', function(event) {
        const input = event.target.value.trim();
        if (input !== '') {
            displaySuggestions(input);
        } else {
            // Hide the suggestion list if input is empty
            suggestionList.style.display = 'none';
        }
    });
});
