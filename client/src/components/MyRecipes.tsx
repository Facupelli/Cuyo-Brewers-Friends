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
        <p>MY RECIPES</p>
        <div className="grid grid-cols-7 m-4 ">
          <p className="col-span-2">Recipe</p>
          <p className="col-span-1">Batch Size</p>
          <p className="col-span-1">ABV</p>
          <p className="col-span-1">IBU</p>
          <p className="col-span-1">SRM</p>
          <p className="col-span-1">Created</p>
        </div>
        {ownRecipes &&
          ownRecipes.map((el) => (
            <div className="grid grid-cols-7 mx-4 p-2 bg-orange-100">
              <div className="col-span-2">
                <Link to={`/recipe/${el._id}`}>
                  <p className="font-semibold">{el.recipe.title}</p>
                </Link>
                <p>{el.recipe.style}</p>
                <p>{el.recipe.sub_category}</p>
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
