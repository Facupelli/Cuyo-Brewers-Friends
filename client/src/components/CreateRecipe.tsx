import React from "react";
import { Recipe } from "../redux/reducers/types";
import bjcp from "bjcp";
import { useForm } from "react-hook-form";

const initialValues: Recipe = {
  _id: 0,
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
    hops: [],
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
};

export const CreateRecipe: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Recipe>();

  const beerStyles = bjcp.beers.map((el) => `${el.number}. ${el.name}`);
  const styleSelected = watch("style", "any").split(". ")[1];

  const beerSubCategories = bjcp.beers
    .filter((el) => el.name === styleSelected)
    .map((el) => el.subcategories);

  return (
    <div>
      <form>
        {/* ------------    PART 1 ------------------------ */}
        <label htmlFor="Title">Title</label>
        <input placeholder="title" {...register("title")} />
        <label htmlFor="Style">Style</label>
        <select {...register("style")}>
          {beerStyles.map((el) => (
            <option>{el}</option>
          ))}
        </select>
        <label htmlFor="Sub_Category">Sub Category</label>
        {styleSelected && (
          <select {...register("sub_category")}>
            {beerSubCategories[0].map((el) => (
              <option>{el.name}</option>
            ))}
          </select>
        )}
        <label htmlFor="Brewery">Brewery</label>
        <input placeholder="brewery" {...register("brewery")} />

        {/* -------------------    PARAMETERS ------------------------ */}
        <label htmlFor="Brewery">Boil Time</label>
        <input placeholder="60" {...register("parameters.boil_time")} />

        <label htmlFor="Brewery">Boil Time</label>
        <input placeholder="20" {...register("parameters.batch_size")} />

        <label htmlFor="Brewery">Boil Time</label>
        <input placeholder="30" {...register("parameters.pre_boil_size")} />

        <label htmlFor="Brewery">Boil Time</label>
        <input placeholder="pre boil gravity" {...register("parameters.pre_boil_gravity")} />

        <label htmlFor="Mash_Ph">Boil Time</label>
        <input placeholder="5.4" {...register("parameters.mash_ph")} />

        <label htmlFor="Efficiency">Efficiency</label>
        <input placeholder="70" {...register("parameters.efficiency")} />

        {/* --------------------    CHARACTERISTICS ------------------------ */}
        <label htmlFor="Original_Gravity">Original Gravity</label>
        <label htmlFor="Final_Gravity">Final Gravity</label>
        <label htmlFor="ABV">ABV</label>
        <label htmlFor="IBU">IBU</label>
        <label htmlFor="SRM">SRM</label>

        

        

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
