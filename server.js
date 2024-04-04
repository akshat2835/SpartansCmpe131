// server.js

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/recipes', async (req, res) => {
    const { ingredients } = req.body;
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&apiKey=1e329d3e673e43fa9a2d26bb59a811f5`);
        const recipes = await response.json();
        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/suggestions', async (req, res) => {
    const { input } = req.query;
    try {
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${encodeURIComponent(input)}&number=5&apiKey=1e329d3e673e43fa9a2d26bb59a811f5`);
        const suggestions = await response.json();
        res.json(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
