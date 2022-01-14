import axios from "axios";

export const getRecipeById = async (id: any) => {
  const response = await axios.get<any>(`/recipe/${id}`);
  return response.data;
};

export const addFav = async (user_id: string, recipe_id: any) => {
  console.log("userid", user_id, "recipe_id", recipe_id);
  const response = await axios.post("/fav", {
    user_id: user_id,
    recipe_id: recipe_id,
  });
  return response;
};

export const deleteFav = async (user_id: string, recipe_id: any) => {
  const response = await axios.delete("/fav", {
    data: {
      user_id: user_id,
      recipe_id: recipe_id,
    },
  });
  return response;
};
