import React from "react";
import { RecipeList } from "../redux/reducers/types";
import { RecipeCard } from "./RecipeCard";

type Props = {
  recipesList: RecipeList[];
};

export const RecipesCardList: React.FC<Props> = ({ recipesList }) => {
  console.log("PROP RECIPELIST:", recipesList);

  return (
    <div>
      <div>
        {recipesList &&
          recipesList.map((recipe, i) => (
            <RecipeCard key={i}  recipe={recipe.recipe} />
          ))}
      </div>
    </div>
  );
};
