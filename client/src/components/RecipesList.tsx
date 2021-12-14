import React from "react";
import { Recipe } from "../redux/reducers/types";
import { RecipeCard } from "./RecipeCard";

type Props = {
  recipes: Recipe[];
};

export const RecipesList: React.FC<Props> = ({ recipes }) => {
  console.log("PROP RECIPES:", recipes);

  return (
    <div>
      <div>
        {recipes &&
          recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
      </div>
    </div>
  );
};
