import React from "react";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { FaTrash, FaLeaf } from "react-icons/fa";
import { hopsList } from "../../media/beer_ingredients/hopsList";
import Select from "react-select";

interface HopNames {
  name: string;
  id: number;
}

export const HopsForm: React.FC<{}> = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "ingredients.hops",
    control,
  });

  console.log(hopsList)
  const hopNames: HopNames[] = hopsList.map((el) => ({
    name: el.Name,
    label: el.Name,
    id: el.Id,
  }));

  return (
    <div className="m-8 p-4 bg-gray-100 shadow-form-shadow">
      <div className="flex justify-center items-baseline gap-2 border-b-2 border-mainC">
        <p className="font-semibold text-2xl pb-4">Hops</p>
        <div className="text-xl">
          <FaLeaf />
        </div>
      </div>

      {fields.map((field, index) => (
        <div key={field.id}>
          <section key={field.id} className="bg-mainC">
            {/* --------------------- PRIMERA LINEA ---------------------------------------- */}

            <div className="grid grid-cols-4 items-center gap-4 p-4 mt-4  ">
              <div className="col-span-1">
                <label className="mr-6 text-gray-700 text-md font-semibold">
                  g:
                </label>
                <Controller
                  name={`ingredients.hops[${index}].quantity` as const}
                  defaultValue={0}
                  control={control}
                  render={({ field }) => (
                    <input
                      className="p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="0"
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="col-span-2 ">
                {hopsList && (
                  // <select
                  //   {...register(`ingredients.hops[${index}].name`)}
                  //   defaultValue=""
                  //   className=" bg-white border w-full border-blue-200 text-gray-700 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  // >
                  //   <option disabled>Select Hop</option>
                  //   {hopNames.map((el, i) => (
                  //     <option key={i}>{el.name}</option>
                  //   ))}
                  // </select>
                  <Controller
                    control={control}
                    name={`ingredients.hops[${index}].name`}
                    defaultValue={{
                      name: "1. American Standard",
                      label: "1. American Standard",
                    }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <Select options={hopNames} onChange={onChange} />
                    )}
                  />
                )}
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="transition ease-in-out duration-150 col-span-1 ml-auto p-2 bg-transparent hover:bg-main text-main font-semibold hover:text-white  border border-main hover:border-transparent rounded"
              >
                <FaTrash />
              </button>
            </div>

            {/* ----------------------- SEGUNDA LINEA ----------------------------------------------- */}

            <div className="grid grid-cols-4 items-center gap-2">
              <div className="col-span-1 items-center ml-2 ">
                <label className=" text-gray-700 text-md font-semibold">
                  Time
                </label>
                <Controller
                  name={`ingredients.hops[${index}].time`}
                  defaultValue={0}
                  control={control}
                  render={({ field }) => (
                    <input
                      className="ml-4 p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="0"
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="col-span-2 ">
                <select
                  {...register(`ingredients.hops[${index}].use`)}
                  defaultValue=""
                  className="bg-white border ml-2 border-blue-200 text-gray-700 p-2  rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                >
                  <option disabled>Select Use</option>
                  <option>Boil</option>
                  <option>Dry Hop</option>
                  <option>First Wort Hop</option>
                  <option>Hop Stand</option>
                  <option>Hop Back</option>
                  <option>Mash</option>
                </select>
              </div>

              <div className="col-span-1 items-center ml-auto mr-4">
                <label>T° °C</label>
                <Controller
                  name={`ingredients.hops[${index}].temperature`}
                  defaultValue={0}
                  control={control}
                  render={({ field }) => (
                    <input
                      className="ml-4 p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="0"
                      {...field}
                    />
                  )}
                />
              </div>
              <p className="text-xs text-gray-400 pb-2 pl-2">
                minutes (days for DH)
              </p>
            </div>
          </section>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            quantity: 0,
          })
        }
        className="transition ease-in-out duration-150 my-4 text-sm bg-transparent hover:bg-mainC2 text-main font-semibold hover:text-white p-2 border border-mainC2 hover:border-transparent rounded"
      >
        ADD HOP +
      </button>
    </div>
  );
};
