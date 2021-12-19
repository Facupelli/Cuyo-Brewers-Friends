import React from "react";
import { Recipe } from "../redux/reducers/types";
import { Link } from "react-router-dom";

type Props = {
  recipe: Recipe;
  id: string;
};

export const RecipeCard: React.FC<Props> = ({ recipe, id }) => {

  return (
    <div className="bg-amber-100 rounded m-2 p-6">
      <div>
        <div>
          <Link to={`recipe/${id}`}>
            <p className="text-gray-800 font-semibold">{recipe.title}</p>
          </Link>
        </div>
        <div>
          <p className="text-gray-800">{recipe.style.split(". ")[1]}</p>
        </div>
      </div>

      <div className="flex justify-start gap-6">
        <div className="flex items-center gap-2">
          <p className="text-gray-600">OG:</p>
          <p>{recipe.characteristics.original_gravity}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-gray-600">FG:</p>
          <p>{recipe.characteristics.final_gravity}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-gray-600">ABV:</p>
          <p>{recipe.characteristics.alcohol_by_volume}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-gray-600">IBU:</p>
          <p>{recipe.characteristics.ibu}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-gray-600">SRM:</p>
          <p>{recipe.characteristics.srm}</p>
        </div>
      </div>
    </div>
  );
};
