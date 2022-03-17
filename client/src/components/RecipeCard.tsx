import React from "react";
import { Recipe } from "../redux/reducers/types";
import { Link } from "react-router-dom";

type Props = {
  recipe: Recipe;
  id: string;
};

export const RecipeCard: React.FC<Props> = ({ recipe, id }) => {

  return (
    <div className="bg-mainC  rounded m-2 p-3 md:p-6">
      <div>
        <div>
          <Link to={`/recipe/${id}`}>
            <p className="text-main font-semibold hover:text-mainC2 hover:font-bold transition ease-in-out delay-50">{recipe.title}</p>
          </Link>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-main text-sm ">{recipe.style.label}</p>
          <p className="text-mainC2 ">{recipe.sub_category}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-start gap-x-6 md:gap-6">
        <div className="flex items-center gap-2">
          <p className="text-main font-semibold">OG:</p>
          <p>{recipe.characteristics.original_gravity}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-main font-semibold">FG:</p>
          <p>{recipe.characteristics.final_gravity}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-main font-semibold">ABV:</p>
          <p>{recipe.characteristics.alcohol_by_volume}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-main font-semibold">IBU:</p>
          <p>{recipe.characteristics.ibu}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-main font-semibold">SRM:</p>
          <p>{recipe.characteristics.srm}</p>
        </div>
      </div>
    </div>
  );
};
