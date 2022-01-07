import React, { useEffect } from "react";
import bjcp from "bjcp";
import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";

type Props = {
  setEff: React.Dispatch<React.SetStateAction<any>>;
  setBatch_size: React.Dispatch<React.SetStateAction<any>>;
};

export const BatchParams: React.FC<Props> = ({ setEff, setBatch_size }) => {
  const {
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  type Options = {
    value: string;
    label: string;
  };

  // const getBeerStyles = () => {
  //   const beerStyles = bjcp.beers.map((el) => ({
  //     value: `${el.number}. ${el.name}`,
  //     label: `${el.number}. ${el.name}`,
  //   }));
  //   return beerStyles;
  // };

  const beerStyles: Options[] = bjcp.beers.map((el) => ({
    value: `${el.number}. ${el.name}`,
    label: `${el.number}. ${el.name}`,
  }));

  // const styleSelected = watch("style", "any").split(". ")[1];

  let styleSelected = watch("style", {
    value: "1. American Standard",
    label: "1. American Standard",
  });

  // const styleSelectedAfter = styleSelected.label.split(". ")[1];

  const efficiency = watch("parameters.efficiency");
  const batch_size = watch("parameters.batch_size");

  useEffect(() => {
    setEff(efficiency);
  }, [efficiency, setEff]);

  useEffect(() => {
    setBatch_size(batch_size);
  }, [batch_size, setBatch_size]);

  const beerSubCategories = bjcp.beers
    .filter((el) => el.name === styleSelected.label?.split(". ")[1])
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
                className="p-2  shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
          <div className="pt-4 text-orange-600 text-sm">
            <span>{errors && errors.parameters?.batch_size?.message}</span>
          </div>
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
                className=" p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
          <div className="pt-4 text-orange-600 text-sm">
            <span>
              {errors && errors.parameters?.pre_boil_gravity?.message}
            </span>
          </div>
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
                className=" p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
          <div className="pt-4 text-orange-600 text-sm">
            <span>{errors && errors.parameters?.boil_time?.message}</span>
          </div>
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
            defaultValue={{
              name: "1. American Standard",
              label: "1. American Standard",
            }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select options={beerStyles} onChange={onChange} />
            )}
          />
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
                className=" bg-white border border-blueLight text-gray-700 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
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
                className=" p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
          <div className="pt-4 text-orange-600 text-sm">
            <span>{errors && errors.parameters?.efficiency?.message}</span>
          </div>
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
                className=" p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
          <div className="pt-4 text-orange-600 text-sm">
            <span>{errors && errors.parameters?.mash_ph?.message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
