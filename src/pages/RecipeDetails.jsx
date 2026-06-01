import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function RecipeDetails() {

  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    loadRecipe();
  }, [id]); // added dependency

  const loadRecipe = async () => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      const meal = res.data.meals[0];
      setRecipe(meal);

      let recent =
        JSON.parse(localStorage.getItem("recentRecipes")) || [];

      recent = recent.filter(
        item => item.idMeal !== meal.idMeal
      );

      recent.unshift(meal);
      recent = recent.slice(0, 5);

      localStorage.setItem(
        "recentRecipes",
        JSON.stringify(recent)
      );

    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  if (!recipe) {
    return (
      <h1 className="py-20 text-center text-2xl font-semibold text-slate-600">
        Loading...
      </h1>
    );
  }

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="space-y-8 rounded-3xl border border-orange-100 bg-white p-6 shadow-lg md:p-10">

        <Link
          to="/"
          className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
        >
          ← Back to search
        </Link>

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="mb-2 max-h-[460px] w-full rounded-3xl object-cover"
        />

        <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">
          {recipe.strMeal}
        </h1>

        <p className="text-lg text-slate-600 md:text-xl">
          Cuisine: {recipe.strArea}
        </p>

        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Ingredients
        </h2>

        <ul className="grid gap-2 rounded-2xl bg-orange-50 p-6 md:grid-cols-2">
          {ingredients.map((item, index) => (
            <li key={index} className="text-slate-700">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Instructions
        </h2>

        <p className="leading-8 text-slate-700">
          {recipe.strInstructions}
        </p>

        {recipe.strYoutube && (
          <div className="mt-2">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">
              Video Tutorial
            </h2>

            <iframe
              width="100%"
              height="500"
              className="rounded-2xl"
              src={`https://www.youtube.com/embed/${recipe.strYoutube.split("v=")[1]}`}
              title="Recipe Video"
              allowFullScreen
            ></iframe>
          </div>
        )}

      </div>
    </div>
  );
}

export default RecipeDetails;