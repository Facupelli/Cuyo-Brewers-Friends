import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/reducers/RootReducer";
import { NavBar } from "./NavBar";

export const MyRecipes: React.FC = () => {
  const ownRecipes = useSelector(
    (state: RootState) => state.storeUser.userData.ownRecipes
  );

  console.log(ownRecipes);

  return (
    <>
      <NavBar route="myrecipes" />
      <div>
        <p className="m-4 py-4 font-semibold text-2xl">MY RECIPES</p>
        <div className="grid grid-cols-7 m-4 ">
          <p className="col-span-2 font-semibold text-sm">Recipe</p>
          <p className="col-span-1 font-semibold text-sm">Batch Size</p>
          <p className="col-span-1 font-semibold text-sm">ABV</p>
          <p className="col-span-1 font-semibold text-sm">IBU</p>
          <p className="col-span-1 font-semibold text-sm">SRM</p>
          <p className="col-span-1 font-semibold text-sm">Created</p>
        </div>
        {ownRecipes &&
          ownRecipes.map((el) => (
            <div key={el._id} className="grid grid-cols-7 mx-4 p-2 bg-orange-100">
              <div className="col-span-2">
                <Link to={`/recipe/${el._id}`}>
                  <p className="font-semibold">{el.recipe.title}</p>
                </Link>
                <p>{el.recipe.style}</p>
                <p className="font-semibold text-gray-600">{el.recipe.sub_category}</p>
              </div>
              <p className="col-span-1">
                {el.recipe.parameters.batch_size} Liters
              </p>
              <p className="col-span-1">
                {el.recipe.characteristics.alcohol_by_volume}%
              </p>
              <p className="col-span-1">{el.recipe.characteristics.ibu}</p>
              <p className="col-span-1">{el.recipe.characteristics.srm}</p>
              <p className="col-span-1">{el.date}</p>
            </div>
          ))}
      </div>
    </>
  );
};
