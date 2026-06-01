import { useContext } from "react";
import { Link } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";

function Favorites(){

const {
favorites,
toggleFavorite
} = useContext(RecipeContext);

return(
<div className="space-y-8 p-2 md:p-4">
<div className="rounded-3xl bg-gradient-to-r from-rose-500 to-orange-500 p-8 text-white shadow-lg">
<h1 className="mb-2 text-4xl font-bold md:text-5xl">
Saved Recipes
</h1>
<p className="text-orange-50">All your favorite meals in one place.</p>
</div>

{favorites.length===0 ? (
<p className="rounded-2xl border border-orange-100 bg-white p-10 text-center text-xl text-slate-600 shadow">
No saved recipes yet.
</p>
):(
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
{favorites.map(recipe=>(
<div
key={recipe.idMeal}
className="overflow-hidden rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
>
<img
src={recipe.strMealThumb}
className="mb-4 h-56 w-full rounded-xl object-cover"
/>

<h2 className="text-xl font-bold text-slate-900">
{recipe.strMeal}
</h2>

<p className="mt-1 text-slate-600">
Cuisine: {recipe.strArea}
</p>

<div className="mt-5 flex items-center justify-between gap-2">
<Link
to={`/recipe/${recipe.idMeal}`}
className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
>
View
</Link>
<button
onClick={()=>
toggleFavorite(recipe)
}
className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
>
Remove
</button>
</div>
</div>
))}
</div>
)}
</div>
)
}

export default Favorites;