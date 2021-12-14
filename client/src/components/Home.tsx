import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/RootReducer";
import {RecipesList} from "./RecipesList";
import { Recipe } from "../redux/reducers/types";

export default function Home() {
  // const recipes = useSelector<RootState, Recipe[]>((state) => state.recipes);
  const recipes = useSelector((state : RootState) => state.storeRecipes.recipes);


  useEffect(() => {
    axios
      .get("/recipes")
      .then((res) => res.data)
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <h3>HOME</h3>
      <RecipesList  recipes={recipes}/>
    </div>
  );
}
