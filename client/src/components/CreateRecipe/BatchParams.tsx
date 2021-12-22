import React from "react";
import bjcp from "bjcp";
import { useFormContext, Controller } from "react-hook-form";

export const BatchParams: React.FC = () => {
  const {
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const beerStyles = bjcp.beers.map((el) => `${el.number}. ${el.name}`);
  // const styleSelected = watch("style", "any").split(". ")[1];
  let styleSelected = watch("style", "1. American Standard");
  let styleSelectedAfter = "1. American Standard";
  if (styleSelected !== undefined) {
    styleSelectedAfter = styleSelected.split(". ")[1];
  }

  const sub = watch("sub_category");

  const beerSubCategories = bjcp.beers
    .filter((el) => el.name === styleSelectedAfter)
    .map((el) => el.subcategories);

  return (
    <div className="grid grid-cols-2 p-8">
      <div className="grid-cols-1 flex flex-col p-4 bg-orange-100">
        <div className="flex items-center gap-4 my-2">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Batch Size
          </label>
          <Controller
            name="parameters.batch_size"
            control={control}
            defaultValue={20}
            render={({ field }) => (
              <input
                placeholder="20"
                className="ml-4 p-2  shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
          <p className="text-gray-700 text-md font-semibold">L.</p>
          <span>
            {errors && errors.recipe?.parameters?.batch_size?.message}
          </span>
        </div>

        <div className="flex items-center gap-4 my-2">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Pre Boil Gravity
          </label>
          <Controller
            name="parameters.pre_boil_gravity"
            control={control}
            defaultValue={30}
            render={({ field }) => (
              <input
                placeholder="30"
                className="ml-4 p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
          <p className="text-gray-700 text-md font-semibold">L.</p>
          <span>
            {errors && errors.recipe?.parameters?.pre_boil_gravity?.message}
          </span>
        </div>

        <div className="flex items-center gap-4 my-2">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Boil Time
          </label>
          <Controller
            name="parameters.boil_time"
            control={control}
            defaultValue={60}
            render={({ field }) => (
              <input
                placeholder="60"
                className="ml-4 p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
          <p className="text-gray-700 text-md font-semibold">min.</p>
        </div>
        <span>{errors && errors.recipe?.parameters?.boil_time?.message}</span>
      </div>

      {/* ---------------------- SEGUNDA COLUMNA --------------------------------- */}

      <div className="grid-cols-1 flex flex-col p-4 bg-orange-100">
        <div className="flex items-center my-2">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Style
          </label>
          <select
            {...register("style")}
            defaultValue="1. American Standard"
            className="ml-4  bg-white border border-orange-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
          >
            <option disabled>Select Style...</option>
            {beerStyles.map((el) => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center my-2">
          {styleSelected && (
            <>
              <label className="my-2 text-gray-700 text-md font-semibold">
                Sub Category
              </label>

              <select
                {...register("sub_category")}
                defaultValue="Select Category..."
                className="ml-4 bg-white border border-orange-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              >
                <option disabled>Select Category...</option>
                {beerSubCategories[0].map((el) => (
                  <option key={el.name}>{el.name}</option>
                ))}
              </select>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 my-2">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Efficiency
          </label>
          <Controller
            name="parameters.efficiency"
            control={control}
            defaultValue={70}
            render={({ field }) => (
              <input
                placeholder="70"
                className="ml-4 p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
          <p className="text-gray-700 text-md font-semibold">%</p>
          <span>
            {errors && errors.recipe?.parameters?.efficiency?.message}
          </span>
        </div>

        <div className=" my-2">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Mash Ph
          </label>
          <Controller
            name="parameters.mash_ph"
            control={control}
            defaultValue={5.4}
            render={({ field }) => (
              <input
                placeholder="5.4"
                className="ml-4 p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
          <span>{errors && errors.recipe?.parameters?.mash_ph?.message}</span>
        </div>
      </div>
    </div>
  );
};
