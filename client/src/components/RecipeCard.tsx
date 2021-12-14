import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Recipe } from "../redux/reducers/types";
import { RootState } from "../redux/reducers/RootReducer";

type Props = {
  recipe: Recipe
}

export const RecipeCard:React.FC<Props> = ({recipe}) => {

  const dispatch = useDispatch();

  return (
    <div>
      Recipe
    </div>
  );
}
