import {useEffect,useState}
from "react";
import { Link } from "react-router-dom";

function RecentRecipes(){

const [recent,setRecent]=
useState([]);

useEffect(()=>{

setRecent(
JSON.parse(
localStorage.getItem(
"recentRecipes"
)
)||[]
);

},[]);

return(
<div className="space-y-8 p-2 md:p-4">

<div className="rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 p-8 text-white shadow-lg">
<h1 className="mb-2 text-4xl font-bold md:text-5xl">
Recently Viewed
</h1>
<p className="text-indigo-100">Quick access to meals you viewed recently.</p>
</div>

{recent.length===0 ? (
<p className="rounded-2xl border border-indigo-100 bg-white p-10 text-center text-xl text-slate-600 shadow">
No recent recipes yet.
</p>
):(
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

{recent.map(recipe=>(

<Link
to={`/recipe/${recipe.idMeal}`}
key={recipe.idMeal}
className="overflow-hidden rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
>

<img
src={recipe.strMealThumb}
className="mb-4 h-56 w-full rounded-xl object-cover"
/>

<h2 className="text-xl font-bold text-slate-900">
{recipe.strMeal}
</h2>
<p className="mt-1 text-sm font-medium text-indigo-500">View details</p>

</Link>

))}

</div>
)}

</div>
)
}

export default RecentRecipes;