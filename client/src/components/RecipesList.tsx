import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/RootReducer";

export default function RecipesList() {

  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipes)

  return (
    <div>
      Recipes-List
    </div>
  );
}
