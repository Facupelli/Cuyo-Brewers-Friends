import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Recipe } from "../redux/reducers/types";
import { RootState } from "../redux/reducers/RootReducer";
import {RecipeCard} from "./RecipeCard";

type Props = {
  recipes: Recipe[];
}

export const RecipesList:React.FC<Props> = ({recipes}) => {

  console.log(recipes)

  return (
    <div>
      <h6>Recipes-List</h6>
      {/* <div>
      {recipes && 
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      </div> */}
    </div>
  );
}
