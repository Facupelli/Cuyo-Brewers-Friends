import React from "react";
import { Recipe } from "../redux/reducers/types";
import { Link } from "react-router-dom";

type Props = {
  recipe: Recipe;
};

export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <div className="w-72 bg-amber-100 rounded m-2 p-4">
      <div>
        <div>
          <Link to="#recipeid">{recipe.title}</Link>
        </div>
        <div>{recipe.style}</div>
      </div>

      <div className="flex justify-start gap-6">
        <div>{recipe.characteristics.original_gravity}</div>
        <div>{recipe.characteristics.final_gravity}</div>
        <div>{recipe.characteristics.alcohol_by_volume}</div>
        <div>{recipe.characteristics.ibu}</div>
        <div>{recipe.characteristics.srm}</div>
      </div>
    </div>
  );
};
