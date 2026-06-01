import {
useState,
useContext
} from "react";

import { Link } from "react-router-dom";

import {
searchRecipes,
randomRecipe,
filterByArea,
searchByIngredient
} from "../services/api";

import { RecipeContext }
from "../context/RecipeContext";

function Home(){

const [query,setQuery]=useState("");
const [ingredient,setIngredient]=
useState("");

const [recipes,setRecipes]=
useState([]);

const [featured,setFeatured]=
useState(null);

const [showFeatured,setShowFeatured]=
useState(false);

const [loading,setLoading]=
useState(false);

const [error,setError]=
useState("");

const {toggleFavorite}=
useContext(RecipeContext);

const loadFeaturedRecipe=
async()=>{

const res=
await randomRecipe();

setFeatured(
res.data.meals[0]
);

setShowFeatured(true);

};

const handleSearch=
async()=>{

if(!query) return;

setError("");
setLoading(true);

const res=
await searchRecipes(query);

if(!res.data.meals){
setRecipes([]);
setError(
"No recipes found."
);
}
else{
setRecipes(
res.data.meals
);
}

setLoading(false);

};

const handleRandom=
async()=>{

setError("");
setLoading(true);

const res=
await randomRecipe();

setRecipes(
res.data.meals || []
);

setLoading(false);

};

const handleCuisine =
async(area)=>{

setError("");
setLoading(true);

try{

const res =
await filterByArea(area);

if(
!res.data.meals ||
res.data.meals.length===0
){
setRecipes([]);
setError(
`${area} recipes not found.`
);
}
else{

setRecipes(
res.data.meals
);

}

}
catch(error){

setError(
"Something went wrong."
);

}

setLoading(false);

};

const handleIngredient=
async()=>{

if(!ingredient) return;

setError("");
setLoading(true);

const res=
await searchByIngredient(
ingredient
);

if(!res.data.meals){
setRecipes([]);
setError(
"No recipes found."
);
}
else{
setRecipes(
res.data.meals
);
}

setLoading(false);

};

return(
<div className="space-y-10">

<section className="rounded-3xl bg-gradient-to-br from-orange-500 via-rose-500 to-fuchsia-600 px-6 py-12 text-center text-white shadow-2xl md:px-12">

<p className="mx-auto mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
Discover amazing meals in seconds
</p>

<h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
Cook Something Great Today
</h1>

<p className="mx-auto mb-8 max-w-2xl text-sm text-orange-50 md:text-base">
Search by dish name, ingredient, or cuisine. Save favorites and discover your next perfect recipe.
</p>

<div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-3xl bg-white/95 p-4 shadow-xl md:flex-row md:p-5">
<input
value={query}
onChange={(e)=>
setQuery(e.target.value)
}
placeholder="Search pasta, biryani, sushi..."
className="w-full flex-1 rounded-2xl border border-orange-100 px-5 py-3 text-slate-700 outline-none ring-0 transition placeholder:text-slate-400 focus:border-orange-400 md:text-lg"
/>

<button
onClick={handleSearch}
className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:brightness-105"
>
Search
</button>

<button
onClick={handleRandom}
className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:brightness-105"
>
Surprise Me
</button>
<button
onClick={handleIngredient}
className="rounded-2xl border border-orange-200 bg-white px-8 py-3 font-semibold text-slate-700 transition hover:bg-orange-50"
>
Find by Ingredient
</button>
</div>

<div className="mx-auto mt-5 max-w-xl">
<input
value={ingredient}
onChange={(e)=>
setIngredient(e.target.value)
}
placeholder="Type ingredient: chicken, cheese, tomato..."
className="w-full rounded-2xl border border-white/60 bg-white/20 px-5 py-3 text-white placeholder:text-orange-100/90 outline-none transition focus:border-white"
/>
</div>
</section>

<section className="rounded-3xl border border-orange-100 bg-white p-6 shadow-lg md:p-8">
<h2 className="mb-4 text-xl font-bold text-slate-800 md:text-2xl">
Explore by cuisine
</h2>
<div className="flex flex-wrap gap-3">
{["Indian","Italian","Chinese","Mexican","American","French"].map((area)=>(
<button
key={area}
onClick={()=>handleCuisine(area)}
className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:bg-orange-100"
>
{area}
</button>
))}
</div>
</section>

<div className="text-center">
<button
onClick={()=>{
if(showFeatured){
setShowFeatured(false);
}else{
loadFeaturedRecipe();
}
}}
className="rounded-2xl bg-slate-900 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-slate-800"
>
{showFeatured ? "Hide Meal Of The Day" : "Show Meal Of The Day"}
</button>
</div>

{showFeatured && featured && (
<section className="grid items-center gap-8 rounded-3xl border border-orange-100 bg-white p-6 shadow-lg md:grid-cols-2 md:p-8">
<img
src={featured.strMealThumb}
className="h-full w-full rounded-3xl object-cover"
/>
<div className="text-left">
<span className="mb-4 inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
Meal Of The Day
</span>
<h3 className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl">
{featured.strMeal}
</h3>
<p className="mb-6 text-slate-600">
Cuisine: {featured.strArea}
</p>
<Link
to={`/recipe/${featured.idMeal}`}
className="inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
>
View Recipe
</Link>
</div>
</section>
)}

{loading && (

<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

{[1,2,3].map(i=>(

<div
key={i}
className="h-72 animate-pulse rounded-2xl bg-slate-200"
></div>

))}

</div>

)}

{error && (
<h2 className="rounded-2xl border border-red-100 bg-red-50 py-6 text-center text-2xl font-semibold text-red-600">
{error}
</h2>
)}

<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

{recipes.map(recipe=>(

<Link
to={`/recipe/${recipe.idMeal}`}
key={recipe.idMeal}
>

<div className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

<div className="overflow-hidden">
<img
src={recipe.strMealThumb}
className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
/>
</div>

<div className="p-6">

<span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
{recipe.strArea}
</span>

<h2 className="mb-4 text-xl font-bold text-slate-900 transition group-hover:text-orange-600">
{recipe.strMeal}
</h2>

<div className="mt-6 flex items-center justify-between">

<span className="font-semibold text-slate-500">
View Recipe →
</span>

<button
onClick={(e)=>{
e.preventDefault();
toggleFavorite(recipe);
}}
className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
>
❤ Save
</button>

</div>

</div>

</div>

</Link>

))}

</div>

</div>
)
}

export default Home;