import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers/RootReducer";
import { NavBar } from "./NavBar";
import { RecipesCardList } from "./RecipesCardList";

export default function Home() {
  // const recipes = useSelector<RootState, Recipe[]>((state) => state.recipes);
  const recipesList = useSelector(
    (state: RootState) => state.storeRecipes.recipesList
  );

  const topRecipesList = useSelector(
    (state: RootState) => state.storeRecipes.topRecipesList
  );

  return (
    <div>
      <div>
        <NavBar route="home" />
      </div>
      <div className="grid grid-cols-2">
        <div className="col-span-1 px-6">
          <p className="my-4 ml-2 font-semibold text-brown1 text-2xl">
            New Recipes
          </p>
          <RecipesCardList recipesList={recipesList} />
        </div>
        <div className="col-span-1">
          <p className="my-4 ml-2 font-semibold text-brown1 text-2xl">
            Top Recipes
          </p>
          <RecipesCardList recipesList={topRecipesList} />
        </div>
      </div>
    </div>
  );
}
