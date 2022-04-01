import React, { useEffect } from "react";
import bjcp from "bjcp";
import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";

type Options = {
  value: string;
  label: string;
};

type Props = {
  setEff: React.Dispatch<React.SetStateAction<number>>;
  setBatch_size: React.Dispatch<React.SetStateAction<number>>;
};

export const BatchParams: React.FC<Props> = ({
  setEff,
  setBatch_size,
}) => {
  const {
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const beerStyles: Options[] = bjcp.beers.map((el) => ({
    value: `${el.number}. ${el.name}`,
    label: `${el.number}. ${el.name}`,
  }));

  const getStyleSelected = () => {
    return watch("style", {
      value: "1. American Standard",
      label: "1. American Standard",
    });
  };

  let styleSelected = getStyleSelected();

  const efficiency = watch("parameters.efficiency");
  const batch_size = watch("parameters.batch_size");

  useEffect(() => {
    if (efficiency && efficiency !== 70) setEff(efficiency);
  }, [efficiency, setEff]);

  useEffect(() => {
    if (batch_size && batch_size !== 20) setBatch_size(batch_size);
  }, [batch_size, setBatch_size]);

  const beerSubCategories = bjcp.beers
    .filter((el) => el.name === styleSelected.label?.split(". ")[1])
    .map((el) => el.subcategories);

  return (
    <div className="grid grid-cols-2  md:m-4 p-4">
      <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-y-2 md:gap-4 p-4 bg-gray-100 shadow-form-shadow">
        <div className="col-span-1 items-center">
          <label className=" text-gray-700 text-md font-semibold">
            Batch Size (L.)
          </label>
        </div>
        <Controller
          name="parameters.batch_size"
          control={control}
          defaultValue="20"
          render={({ field }) => (
            <input
              className="col-span-1 py-2 p-2  shadow-input appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-input-outline"
              {...field}
            />
          )}
        />
        <div className="col-span-2 pt-4 text-orange-600 text-sm">
          <span>{errors && errors.parameters?.batch_size?.message}</span>
        </div>

        <div className="col-span-1 items-center">
          <label className=" text-gray-700 text-md font-semibold">
            Pre Boil Gravity (L.)
          </label>
        </div>
        <Controller
          name="parameters.pre_boil_gravity"
          control={control}
          defaultValue="30"
          render={({ field }) => (
            <input
              className="col-span-1 py-2 p-2 shadow-input appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-input-outline"
              {...field}
            />
          )}
        />
        <div className="col-span-2 pt-4 text-orange-600 text-sm">
          <span>{errors && errors.parameters?.pre_boil_gravity?.message}</span>
        </div>

        <div className="col-span-1 items-center">
          <label className=" text-gray-700 text-md font-semibold">
            Boil Time (min.)
          </label>
        </div>
        <Controller
          name="parameters.boil_time"
          control={control}
          defaultValue="60"
          render={({ field }) => (
            <input
              placeholder="60"
              className="col-span-1 py-2 p-2 shadow-input appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-input-outline"
              {...field}
            />
          )}
        />
        <div className="col-span-2 pt-4 text-orange-600 text-sm">
          <span>{errors && errors.parameters?.boil_time?.message}</span>
        </div>
      </div>

      {/* ---------------------- SEGUNDA COLUMNA --------------------------------- */}

      <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-4 p-4 bg-gray-100">
        <div className="col-span-1 items-center ">
          <label className=" text-gray-700 text-md font-semibold">Style</label>
        </div>
        <div className="col-span-1">
          {/* <select
            {...register("style")}
            defaultValue="1. American Standard"
            className="  bg-white border border-blueLight text-gray-700 py-2 pl-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option disabled>Select Style...</option>
            {beerStyles.map((el) => (
              <option key={el}>{el}</option>
            ))}
          </select> */}
          <Controller
            control={control}
            name="style"
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                options={beerStyles}
                onChange={onChange}
                className="shadow-input"
              />
            )}
          />
        </div>

        {styleSelected && (
          <>
            <div className="col-span-1 items-center my-2">
              <label className=" text-gray-700 text-md font-semibold">
                Sub Category
              </label>
            </div>
            <select
              {...register("sub_category")}
              defaultValue=""
              className="col-span-1 border-none shadow-input  bg-white border border-gray-300 text-gray-700 py-2 md:p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-mainC2"
            >
              <option value="" disabled>Select Category...</option>
              {beerSubCategories[0].map((el) => (
                <option key={el.name}>{el.name}</option>
              ))}
            </select>
          </>
        )}

        <div className="col-span-1 items-center my-2 ">
          <label className=" text-gray-700 text-md font-semibold">
            Efficiency (%)
          </label>
        </div>
        <Controller
          name="parameters.efficiency"
          control={control}
          defaultValue="70"
          render={({ field }) => (
            <input
              placeholder="70"
              className="col-span-1 py-2 p-2 shadow-input appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-input-outline"
              {...field}
            />
          )}
        />
        {errors.parameters?.efficiency && (
          <div className="col-span-2 pt-4 text-orange-600 text-sm">
            <span>{errors.parameters?.efficiency?.message}</span>
          </div>
        )}

        <div className="col-span-1 my-2 ">
          <label className=" text-gray-700 text-md font-semibold">
            Mash Ph
          </label>
        </div>
        <Controller
          name="parameters.mash_ph"
          control={control}
          defaultValue="5.4"
          render={({ field }) => (
            <input
              placeholder="5.4"
              className="col-span-1 py-2 p-2 shadow-input appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-input-outline"
              {...field}
            />
          )}
        />
        <div className="col-span-2 pt-4 text-orange-600 text-sm">
          <span>{errors && errors.parameters?.mash_ph?.message}</span>
        </div>
      </div>
    </div>
  );
};
