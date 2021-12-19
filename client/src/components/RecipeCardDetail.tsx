import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../utils/recipesUtils";

export const RecipeCardDetail: React.FC = () => {
  const [recioe, setRecipe] = useState({ recipe: {}, user: {} });

  const { id } = useParams();
  console.log("ID", id);

  useEffect(() => {
    getRecipeById(id)
      .then((data) => setRecipe({ recipe: data.recipe, user: data.user }))
      .catch((e) => console.log(e));
  }, [id]);

  return <div>DETAIL</div>;
};
