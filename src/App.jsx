import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import RecentRecipes from "./pages/RecentRecipes";

function App(){

return(
<BrowserRouter>

<Navbar/>

<main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6 md:px-8">

<Routes>

<Route
path="/"
element={<Home/>}
/>

<Route
path="/recipe/:id"
element={<RecipeDetails/>}
/>

<Route
path="/favorites"
element={<Favorites/>}
/>

<Route
path="/recent"
element={<RecentRecipes/>}
/>

</Routes>
</main>

</BrowserRouter>
)
}

export default App;