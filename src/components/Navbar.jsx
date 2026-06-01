import { Link } from "react-router-dom";

function Navbar(){

return(
<nav className="sticky top-0 z-50 border-b border-orange-100 bg-white/85 shadow-sm backdrop-blur">
<div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">

<h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
Recipe Finder
</h2>

<div className="flex items-center gap-2 rounded-full bg-orange-50 p-1.5">

<Link
to="/"
className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-orange-500 md:text-base"
>
Home
</Link>

<Link
to="/favorites"
className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-orange-500 md:text-base"
>
Favorites
</Link>

<Link
to="/recent"
className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-orange-500 md:text-base"
>
Recent
</Link>

</div>
</div>

</nav>
)
}

export default Navbar;