import React from "react";
import { Recipe } from "../redux/reducers/types";

type Props = {
  recipe: Recipe
}

export const RecipeCard:React.FC<Props> = ({recipe}) => {

  return (
    <div>
      {recipe.title}
    </div>
  );
}
