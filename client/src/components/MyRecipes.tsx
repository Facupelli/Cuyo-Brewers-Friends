import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserData } from "../redux/action-creators";
import { RootState } from "../redux/reducers/RootReducer";
import { NavBar } from "./NavBar";

export const MyRecipes: React.FC = (z) => {
  const ownRecipes = useSelector(
    (state: RootState) => state.storeUser.userData.ownRecipes
  );

  console.log(ownRecipes);

  return (
    <>
      <NavBar route="myrecipes" />
      <div className="mt-16">
        <div className="grid grid-cols-9 m-4 px-4 ">
          <p className="col-span-2 font-semibold text-sm text-brown1">Recipe</p>
          <p className="col-span-2 font-semibold text-sm text-brown1">Style</p>
          <p className="col-span-1 font-semibold text-sm text-brown1">
            Batch Size
          </p>
          <p className="col-span-1 font-semibold text-sm text-brown1">ABV</p>
          <p className="col-span-1 font-semibold text-sm text-brown1">IBU</p>
          <p className="col-span-1 font-semibold text-sm text-brown1">SRM</p>
          <p className="col-span-1 font-semibold text-sm text-brown1">
            Created
          </p>
        </div>
        {ownRecipes.length > 0 ? (
          ownRecipes.map((el) => (
            <div
              key={el._id}
              className="grid grid-cols-9 mx-4 py-6 px-4 bg-gray-100 mb-2 border-b border-blueLight"
            >
              <div className="col-span-2">
                <Link to={`/recipe/${el._id}`}>
                  <p className="font-semibold">{el.recipe.title}</p>
                </Link>
              </div>
              <div className="col-span-2 flex gap-4">
                <p>{el.recipe.style.label}</p>
                <p className="font-semibold text-blueDark">
                  {el.recipe.sub_category}
                </p>
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
          ))
        ) : (
          <div className="py-8 m-8">
            <p className=" text-xl font-semibold">
              You have not created any recipe yet!
            </p>
            <p>Go to ADD RECIPE to create your first recipe.</p>
          </div>
        )}
      </div>
    </>
  );
};
