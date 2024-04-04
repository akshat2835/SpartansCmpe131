// script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const ingredients = ingredientInput.value.trim();
        if (ingredients !== '') {
            try {
                const response = await fetch('/api/recipes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ingredients })
                });
                const recipes = await response.json();
                // Display recipes
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        }
    });

    // Modal functionality
    const modalClose = document.getElementById('modal-close');
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
