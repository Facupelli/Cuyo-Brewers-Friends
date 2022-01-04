import React from "react";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { FaTrash, FaLeaf } from "react-icons/fa";
import { hopsList } from "../../media/beer_ingredients/hopsList";

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

  const hopNames: HopNames[] = hopsList.map((el) => ({
    name: el.Name,
    id: el.Id,
  }));

  return (
    <div className="m-8 p-4 bg-gray-100">
      <div className="flex justify-center items-baseline gap-2 border-b-2 border-blueLight">
        <p className="font-semibold text-2xl pb-4">Hops</p>
        <div className="text-xl">
          <FaLeaf />
        </div>
      </div>

      {fields.map((field, index) => (
        <div key={field.id}>
          <section key={field.id} className="bg-blue-100">
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

              {hopsList && (
                <select
                  {...register(`ingredients.hops[${index}].name`)}
                  defaultValue=""
                  className="col-span-2 bg-white border w-full border-blue-200 text-gray-700 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                >
                  <option disabled>Select Hop</option>
                  {hopNames.map((el, i) => (
                    <option key={i}>{el.name}</option>
                  ))}
                </select>
              )}

              <button
                type="button"
                onClick={() => remove(index)}
                className="col-span-1 ml-auto p-2 bg-transparent hover:bg-blue-500 text-brown1 font-semibold hover:text-white  border border-brown1 hover:border-transparent rounded"
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
              <div className="col-span-2">
                <select
                  {...register(`ingredients.hops[${index}].use`)}
                  defaultValue=""
                  className="bg-white border border-blue-200 text-gray-700 p-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
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
              <p className="text-xs text-gray-400 pb-2">minutes (days for DH)</p>
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
        className="my-4 text-sm bg-transparent hover:bg-blue-500 text-brown1 font-semibold hover:text-white p-2 border border-blueLight hover:border-transparent rounded"
      >
        ADD HOP +
      </button>

      {/* {[...Array(count)].map((el, count) => (
        <div key={count} className="p-4 mt-4 bg-blue-100">
          <div className="grid grid-cols-3 items-center">
            <div className="col-span-1">
              <label className="mr-6 text-gray-700 text-md font-semibold">
                g
              </label>
              <Controller
                name={`ingredients.hops[${count}].quantity`}
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
            <div className="col-span-2">
              {hopsList && (
                <select
                  {...register(`ingredients.hops[${count}].name`)}
                  defaultValue=""
                  className="bg-white border w-full border-blue-200 text-gray-700 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                >
                  {hopNames.map((el, i) => (
                    <option key={i}>{el.name}</option>
                  ))}
                </select>
              )}

            </div>
          </div> */}

      {/* ----------------------- SEGUNDA LINEA ----------------------------------------------- */}

      {/* <div className="grid grid-cols-3 items-center gap-2">
            <div className="col-span-1 items-center ">
              <label className=" text-gray-700 text-md font-semibold">
                Time
              </label>
              <Controller
                name={`ingredients.hops[${count}].time`}
                defaultValue={0}
                control={control}
                render={({ field }) => (
                  <input
                    className="my-2 ml-4 p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="0"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-span-1">
              <select
                {...register(`ingredients.hops[${count}].use`)}
                defaultValue=""
                className="bg-white border border-blue-200 text-gray-700 p-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
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
            <div className="col-span-1 items-center">
              <label>T° °C</label>
              <Controller
                name={`ingredients.hops[${count}].temperature`}
                defaultValue={0}
                control={control}
                render={({ field }) => (
                  <input
                    className="my-2 ml-4 p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="0"
                    {...field}
                  />
                )}
              />
            </div>
            <p className="text-xs text-gray-400">minutes (days for DH)</p>
          </div>
        </div>
      ))} */}
    </div>
  );
};
