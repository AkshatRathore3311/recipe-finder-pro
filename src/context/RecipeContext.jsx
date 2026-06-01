import {
createContext,
useState,
useEffect
} from "react";

export const RecipeContext =
createContext();

function RecipeProvider({children}){

const [favorites,setFavorites]=useState(
JSON.parse(
localStorage.getItem("favorites")
) || []
);

useEffect(()=>{
localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);
},[favorites]);

const toggleFavorite=(recipe)=>{

const exists=favorites.find(
item=>item.idMeal===recipe.idMeal
);

if(exists){
setFavorites(
favorites.filter(
x=>x.idMeal!==recipe.idMeal
)
);
}
else{
setFavorites(
[...favorites,recipe]
);
}

};

return(
<RecipeContext.Provider
value={{
favorites,
toggleFavorite
}}
>
{children}
</RecipeContext.Provider>
)

}

export default RecipeProvider;