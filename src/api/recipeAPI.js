import axios from "axios";



const API_KEY = 'YOUR_SPOONACULAR_API_KEY'; // Replace with your key
const BASE_URL = 'https://api.spoonacular.com/recipes';



export async function fetchRecipesByIngredients(ingredients) {
  const response = await axios.get(`${BASE_URL}/findByIngredients`, {
    params: {
      ingredients: ingredients.join(','),
      number: 10,
      ranking: 1,
      apiKey: API_KEY,
    }
  });
  return response.data;
}