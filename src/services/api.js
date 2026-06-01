import axios from "axios";

const BASE_URL =
"https://www.themealdb.com/api/json/v1/1";

export const searchRecipes =
(query)=>
axios.get(
`${BASE_URL}/search.php?s=${query}`
);

export const randomRecipe =
()=>
axios.get(
`${BASE_URL}/random.php`
);

export const filterByArea =
(area)=>
axios.get(
`${BASE_URL}/filter.php?a=${area}`
);

export const searchByIngredient =
(ingredient)=>
axios.get(
`${BASE_URL}/filter.php?i=${ingredient}`
);

export const recipeDetails =
(id)=>
axios.get(
`${BASE_URL}/lookup.php?i=${id}`
);