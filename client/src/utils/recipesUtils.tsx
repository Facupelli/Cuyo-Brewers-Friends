import axios from "axios";
import {  RecipeList } from "../redux/reducers/types";

export const getRecipeById = async (id: unknown) => {
  const response = await axios.get<RecipeList>(`/recipe/${id}`);
  return response.data;
};

export const addFav = async (user_id: string, recipe_id: unknown) => {
  console.log("userid", user_id, "recipe_id", recipe_id);
  const response = await axios.post("/fav", {
    user_id: user_id,
    recipe_id: recipe_id,
  });
  return response;
};

export const deleteFav = async (user_id: string, recipe_id: unknown) => {
  const response = await axios.delete("/fav", {
    data: {
      user_id: user_id,
      recipe_id: recipe_id,
    },
  });
  return response;
};
