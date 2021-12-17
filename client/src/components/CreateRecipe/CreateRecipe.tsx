import React, { useState } from "react";
import { Recipe } from "../../redux/reducers/types";
import bjcp from "bjcp";
import { useForm, SubmitHandler, FormProvider, Controller } from "react-hook-form";
import { HopsForm } from "./HopsForm";
import Select from "react-select";
import { MaltsForm } from "./MaltsForm";
import { WaterForm } from "./WaterForm";
import { hopsList } from "../../media/beer_ingredients/hopsList";

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
    hops: [{ name: "", quantity: 0, boil_time: 0 }],
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
  const methods = useForm<Recipe>();

  const beerStyles = bjcp.beers.map((el) => `${el.number}. ${el.name}`);
  const styleSelected = methods.watch("style", "any").split(". ")[1];

  const beerSubCategories = bjcp.beers
    .filter((el) => el.name === styleSelected)
    .map((el) => el.subcategories);


  const formSubmitHandler: SubmitHandler<Recipe> = (data: Recipe) => {
    console.log('FORM DATA IS',data)
  }
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          {/* ------------    PART 1 ------------------------ */}
          <div className="grid grid-cols-2 p-8">
            <div className="col-span-2 p-4">
              <label htmlFor="Title">Title</label>
              <Controller
                name="title"
                defaultValue=""
                control={methods.control}
                render={({ field }) => <input placeholder="Hop Odisey" {...field} />}
              />

              <label htmlFor="Brewery">Brewery</label>
              <Controller
                name="brewery"
                defaultValue=""
                control={methods.control}
                render={({ field }) => <input {...field} />}
              />
            </div>

            <div className="grid-cols-1 flex flex-col p-4">
              <div className="flex">
                <label htmlFor="Batch_Size">Batch Size</label>
                <Controller
                  name="parameters.batch_size"
                  control={methods.control}
                defaultValue={0}
                  render={({ field }) => <input placeholder="20" {...field} />}
                />
              </div>

              <div>
                <label htmlFor="Pre_Boil_Size">Pre Boil Size</label>
                <Controller
                  name="parameters.pre_boil_size"
                  control={methods.control}
                  defaultValue={0}
                  render={({ field }) => <input placeholder="30" {...field} />}
                />
              </div>

              <div>
                <label htmlFor="Boil_Time">Boil Time</label>
                <Controller
                  name="parameters.boil_time"
                  control={methods.control}
                  defaultValue={0}
                  render={({ field }) => <input placeholder="60" {...field} />}
                />
              </div>
            </div>

            <div className="grid-cols-1 flex flex-col p-4">
              <div className="flex">
                <label htmlFor="Style">Style</label>
                <select {...methods.register("style")}>
                  {beerStyles.map((el) => (
                    <option key={el}>{el}</option>
                  ))}
                </select>
              </div>

              <div>
                {styleSelected && (
                  <>
                    <label htmlFor="Sub_Category">Sub Category</label>

                    <select {...methods.register("sub_category")}>
                      {beerSubCategories[0].map((el) => (
                        <option key={el.name}>{el.name}</option>
                      ))}
                    </select>
                  </>
                )}
              </div>

              <div>
                <label htmlFor="Efficiency">Efficiency</label>
                <Controller
                  name="parameters.efficiency"
                  control={methods.control}
                  defaultValue={0}
                  render={({ field }) => <input placeholder="70" {...field} />}
                />
              </div>

              <div>
                <label htmlFor="Mash_Ph">Mash Ph</label>
                <Controller
                  name="parameters.mash_ph"
                  control={methods.control}
                  defaultValue={0}
                  render={({ field }) => <input placeholder="5.4" {...field} />}
                />
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
          <div className="grid-cols-2 flex gap-10 justify-center p-6">
            <p>Original Gravity</p>
            <p>Final Gravity</p>
            <p>ABV</p>
            <p>IBU</p>
            <p>SRM</p>
          </div>

          {/* ------------------------ INGREDIENTS ----------------------------- */}
          <div className="grid grid-cols-2">
            <div className="grid-cols-1">
              <HopsForm />
            </div>

            <div className="grid-cols-1">
              <MaltsForm />
            </div>

            <div className="grid-cols-1">
              <WaterForm />
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
};
