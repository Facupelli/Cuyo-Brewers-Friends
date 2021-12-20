import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../utils/recipesUtils";
import { Recipe } from "../../redux/reducers/types";
import { NavBar } from "../NavBar";
import { CharacteristicsDetail } from "./CharacteristicsDetail";
import { ParametersDetail } from "./ParametersDetail";
import { FermentablesDetail } from "./FermentablesDetail";
import { HopsDetail } from "./HopsDetail";
import { WaterDetail } from "./WaterDetail";
import { Comments } from "./Comments";
import { UserData } from "./UserData";

type RecipeCardDetailParams = {
  id: string;
};

interface State {
  recipe: Recipe;
  user: any;
}

export const RecipeCardDetail: React.FC = () => {
  const [recipe, setRecipe] = useState<State>({
    recipe: {
      title: "",
      style: "",
      sub_category: "",
      brewery: "",
      parameters: {
        boil_time: 0,
        batch_size: 0,
        pre_boil_size: 0,
        pre_boil_gravity: 0,
        mash_ph: 0,
        efficiency: 0,
      },
      characteristics: {
        original_gravity: 0,
        final_gravity: 0,
        alcohol_by_volume: 0,
        ibu: 0,
        srm: 0,
      },
      ingredients: {
        fermentables: [],
        hops: [{ name: "", quantity: 0, time: 0, use: "", temperature: 0 }],
        yeast: [],
        water_profile: {
          calcium: 0,
          magnesium: 0,
          sodium: 0,
          chlorine: 0,
          sulfate: 0,
          bicarbonate: 0,
        },
      },
      photos: [],
    },
    user: {},
  });

  console.log(recipe);

  const { id } = useParams<RecipeCardDetailParams>();

  useEffect(() => {
    getRecipeById(id)
      .then((data) => setRecipe({ recipe: data.recipe, user: data.user }))
      .catch((e) => console.log(e));
  }, [id]);

  const { title, style }: { title: string; style: string } = recipe.recipe;
  const { mash_ph }: { mash_ph: number } = recipe.recipe.parameters;

  return (
    <>
      <NavBar route="recipeDetail" />

      <div className="my-8 mx-24">
        <div className="py-4">
          <p className="font-semibold text-4xl">{title}</p>
        </div>

        <div className="grid grid-cols-5 gap-4 ">
          <div className="col-span-1 border border-gray-800 rounded h-full ">
            <UserData />
          </div>
          <div className="col-span-4">
            <ParametersDetail
              style={style}
              parameters={recipe.recipe.parameters}
            />
          </div>
        </div>

        <CharacteristicsDetail
          mash_ph={mash_ph}
          characteristics={recipe.recipe.characteristics}
        />

        <WaterDetail water={recipe.recipe.ingredients.water_profile} />

        <FermentablesDetail
          fermentables={recipe.recipe.ingredients.fermentables}
        />

        <HopsDetail hops={recipe.recipe.ingredients.hops} />

        <Comments />
      </div>
    </>
  );
};
