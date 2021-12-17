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
        <div className="grid grid-cols-2 p-8">
          <div className="col-span-2 p-4">
            <label htmlFor="Title">Title</label>
            <input placeholder="title" {...register("title")} />

            <label htmlFor="Brewery">Brewery</label>
            <input placeholder="brewery" {...register("brewery")} />
          </div>

          <div className="grid-cols-1 flex flex-col p-4">
            <div className="flex">
              <label htmlFor="Batch_Size">Batch Size</label>
              <input placeholder="20" {...register("parameters.batch_size")} />
            </div>

            <div>
              <label htmlFor="Pre_Boil_Size">Pre Boil Size</label>
              <input
                placeholder="30"
                {...register("parameters.pre_boil_size")}
              />
            </div>

            <div>
              <label htmlFor="Boil_Time">Boil Time</label>
              <input placeholder="60" {...register("parameters.boil_time")} />
            </div>
          </div>

          <div className="grid-cols-1 flex flex-col p-4">
            <div className="flex">
              <label htmlFor="Style">Style</label>
              <select {...register("style")}>
                {beerStyles.map((el) => (
                  <option>{el}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="Sub_Category">Sub Category</label>
              {styleSelected && (
                <select {...register("sub_category")}>
                  {beerSubCategories[0].map((el) => (
                    <option>{el.name}</option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label htmlFor="Efficiency">Efficiency</label>
              <input placeholder="70" {...register("parameters.efficiency")} />
            </div>

            <div>
              <label htmlFor="Mash_Ph">Mash Ph</label>
              <input placeholder="5.4" {...register("parameters.mash_ph")} />
            </div>
          </div>
        </div>

        {/* -------------------    PARAMETERS ------------------------ */}

        {/* <label htmlFor="Pre_Boil_Gravity">Pre Boil Gravity</label>
        <input
          placeholder="pre boil gravity"
          {...register("parameters.pre_boil_gravity")}
        /> */}

        {/* --------------------    CHARACTERISTICS ------------------------ */}
        <div className="flex gap-10 justify-center p-8">
          <p>Original Gravity</p>
          <p>Final Gravity</p>
          <p>ABV</p>
          <p>IBU</p>
          <p>SRM</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
