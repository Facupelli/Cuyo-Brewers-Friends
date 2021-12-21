import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers/RootReducer";
import { NavBar } from "./NavBar";
import { RecipeCard } from "./RecipeCard";

export const MyRecipes: React.FC = () => {
  const ownRecipes = useSelector(
    (state: RootState) => state.storeUser.userData.ownRecipes
  );

  console.log(ownRecipes);

  return (
    <>
      <NavBar route="myrecipes" />
      <div className="m-8">
        <p className="mx-2 mb-6 text-2xl font-semibold">MY RECIPES</p>
        {ownRecipes &&
          ownRecipes.map((el) => <RecipeCard recipe={el.recipe} id={el._id} />)}
      </div>
    </>
  );
};
