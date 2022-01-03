import React, { useEffect } from "react";
import bjcp from "bjcp";
import { useFormContext, Controller } from "react-hook-form";

type Props = {
  setEff: React.Dispatch<React.SetStateAction<any>>;
  setBatch_size: React.Dispatch<React.SetStateAction<any>>;
}

export const BatchParams: React.FC<Props> = ({setEff, setBatch_size}) => {
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

  const efficiency = watch('parameters.efficiency')
  const batch_size = watch('parameters.batch_size')

  useEffect(() => {
    setEff(efficiency)
  }, [efficiency, setEff])

  useEffect(() => {
    setBatch_size(batch_size)
  }, [batch_size, setBatch_size])

  const beerSubCategories = bjcp.beers
    .filter((el) => el.name === styleSelectedAfter)
    .map((el) => el.subcategories);

  return (
    <div className="grid grid-cols-2 border border-gray-200 m-4 p-4">
      <div className="col-span-1 grid grid-cols-2 gap-4 p-4 bg-gray-100">
        <div className="col-span-1 items-center">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Batch Size (L.)
          </label>
        </div>
        <div className="col-span-1">
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
          <span>
            {errors && errors.recipe?.parameters?.batch_size?.message}
          </span>
        </div>

        <div className="col-span-1 items-center">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Pre Boil Gravity (L.)
          </label>
        </div>
        <div className="col-span-1">
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
          <span>
            {errors && errors.recipe?.parameters?.pre_boil_gravity?.message}
          </span>
        </div>

        <div className="col-span-1 items-center">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Boil Time (min.)
          </label>
        </div>
        <div className="col-span-1">
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
          <span>{errors && errors.recipe?.parameters?.boil_time?.message}</span>
        </div>
      </div>

      {/* ---------------------- SEGUNDA COLUMNA --------------------------------- */}

      <div className="col-span-1 grid grid-cols-2 gap-4 p-4 bg-gray-100">
        <div className="col-span-1 items-center ">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Style
          </label>
        </div>
        <div className="col-span-1">
          <select
            {...register("style")}
            defaultValue="1. American Standard"
            className="ml-4  bg-white border border-blueLight text-gray-700 py-2 pl-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option disabled>Select Style...</option>
            {beerStyles.map((el) => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </div>

        {styleSelected && (
          <>
            <div className="col-span-1 items-center my-2">
              <label className="my-2 text-gray-700 text-md font-semibold">
                Sub Category
              </label>
            </div>
            <div className="col-span-1">
              <select
                {...register("sub_category")}
                defaultValue="Select Category..."
                className="ml-4 bg-white border border-blueLight text-gray-700 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option disabled>Select Category...</option>
                {beerSubCategories[0].map((el) => (
                  <option key={el.name}>{el.name}</option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="col-span-1 items-center gap-4 my-2">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Efficiency (%)
          </label>
        </div>
        <div className="col-span-1">
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
          <span>
            {errors && errors.recipe?.parameters?.efficiency?.message}
          </span>
        </div>

        <div className="col-span-1 my-2">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Mash Ph
          </label>
        </div>
        <div className="col-span-1">
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
