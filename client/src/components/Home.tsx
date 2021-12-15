import axios from "axios";
import React, { useEffect } from "react";
import {  useSelector } from "react-redux";
import { RootState } from "../redux/reducers/RootReducer";
import {RecipesCardList} from "./RecipesCardList";

export default function Home() {
  // const recipes = useSelector<RootState, Recipe[]>((state) => state.recipes);
  const recipesList = useSelector((state : RootState) => state.storeRecipes.recipesList);

  useEffect(() => {
    axios
      .get("/recipes")
      .then((res) => res.data)
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <h3>HOME</h3>
      <RecipesCardList  recipesList={recipesList}/>
    </div>
  );
}
