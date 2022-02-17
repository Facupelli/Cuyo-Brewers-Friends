import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers/RootReducer";
import { NavBar } from "./NavBar";
import { RecipesCardList } from "./RecipesCardList";
import { FaLongArrowAltUp } from "react-icons/fa";
import { MdAutorenew } from "react-icons/md";

export default function Home() {
  // const recipes = useSelector<RootState, Recipe[]>((state) => state.recipes);
  const recipesList = useSelector(
    (state: RootState) => state.storeRecipes.recipesList
  );

  const topRecipesList = useSelector(
    (state: RootState) => state.storeRecipes.topRecipesList
  );

  return (
    <div className="">
      <div>
        <NavBar route="home" />
      </div>
      <div className=" ">
        <div className=" max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:mb-12 lg:pt-6">
            <div className="col-span-2 lg:col-span-1 px-6">
              <div className="flex items-center gap-2 text-main">
                <p className="my-4 ml-2 font-semibold  text-2xl">
                  New Recipes
                </p>
                <div className=" text-2xl">
                  <MdAutorenew className="animate-spin-slow" />
                </div>
              </div>
              <RecipesCardList recipesList={recipesList} />
            </div>
            <div className="col-span-2 lg:col-span-1 px-6">
              <div className="flex items-center gap-2 text-main">
                <p className="my-4 ml-2 font-semibold  text-2xl">
                  Top Recipes
                </p>
                <div className=" text-2xl">
                  <FaLongArrowAltUp className="animate-bounce-slow" />
                </div>
              </div>
              <RecipesCardList recipesList={topRecipesList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
