import React, { useEffect, useState } from 'react';
import { fetchRecipesByIngredients } from '../api/recipeAPI';
import { usePantry } from '../contexts/PantryContext';

export default function RecipeRecommendations() {
    const { pantryItems, setPantryItems } = usePantry();
    const [recipes, setRecipes] = useState([]);
    const ingredients = pantryItems.map(item => item.name.toLowerCase());

    useEffect(() => {
        if (ingredients.length === 0) return;
        fetchRecipesByIngredients(ingredients).then(setRecipes);
    }, [ingredients]);

    return (
        <div className="recipe-page">
            <h2>Recommended Recipes</h2>
            <div className="recipe-list">
                {recipes.map(recipe => (
                <div key={recipe.id} className="recipe-card">
                    <img src={recipe.image} alt={recipe.title} />
                    <h4>{recipe.title}</h4>
                    <a 
                        href={`https://spoonacular.com/recipes/${recipe.title.replace(/ /g, '-')}-${recipe.id}`} 
                        target="_blank"
                        rel="noreferrer"
                    >
                    View Recipe
                    </a>
                </div>
                ))}
            </div>
        </div>
    );
}
