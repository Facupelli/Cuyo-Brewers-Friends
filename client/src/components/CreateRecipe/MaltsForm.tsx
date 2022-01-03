import React, { ChangeEvent } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { fermentables } from "../../media/beer_ingredients/fermentables";
import { FaTrash } from "react-icons/fa";

type Props = {
  handleMaltsChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleMaltsQtyChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const MaltsForm: React.FC<Props> = ({
  handleMaltsChange,
  handleMaltsQtyChange,
}) => {

  const { control, register, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: "ingredients.fermentables", control });

  return (
    <div className="m-8 p-4 bg-gray-100">
      <div className="flex justify-center border-b-2 border-blueLight">
        <p className="font-semibold text-2xl pb-4">Fermentables</p>
      </div>

      {fields.map((field, index) => (
        <div key={field.id}>
          <section key={field.id} className="bg-blue-100">
            <div className="grid grid-cols-3 items-center gap-4 p-4 mt-4 ">
              <label className="col-span-1  text-gray-700 text-md font-semibold">
                Malt:
              </label>
              <select
                {...register(`ingredients.fermentables[${index}].name` as const)}
                onChange={handleMaltsChange}
                className="col-span-2 bg-white border border-blue-200  text-gray-700 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option disabled>Select Malt</option>
                {fermentables.map((el) => (
                  <option key={el.name} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>

              <label className="col-span-1 text-gray-700 text-md font-semibold">
                Kg:
              </label>

              <Controller
              name={`ingredients.fermentables[${index}].quantity` as const}
              defaultValue={0}
              control={control}
              render={({ field }) => (
                <input
                  className="col-span-1 p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="0"
                  {...field}
                />
              )}
            />

              <button
                type="button"
                onClick={() => remove(index)}
                className="col-span-1 ml-auto p-2 bg-transparent hover:bg-blue-500 text-brown1 font-semibold hover:text-white  border border-brown1 hover:border-transparent rounded"
              >
                <FaTrash />
              </button>
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
        ADD MALT +
      </button>

      {/* {[...Array(count)].map((el, count) => (
        <div key={count} className="p-4 mt-4 bg-blue-100">
          <div>
            <label className="my-2 mr-6 text-gray-700 text-md font-semibold">
              Malt
            </label>
            <select
              {...register(`ingredients.fermentables[${count}].name`)}
              onChange={handleMaltsChange}
              className="bg-white border border-blue-200  text-gray-700 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            >
              <option disabled>Select Malt</option>
              {fermentables.map((el) => (
                <option key={el.name} value={el.potential}>{el.name}</option>
              ))}
            </select>
          </div> */}

      {/* <div className="flex items-center">
            <Controller
              name={`ingredients.fermentables[${count}].name`}
              defaultValue=""
              control={control}
              render={({ field }) => <input className="my-2 ml-4 p-2 shadow appearance-none rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Pale" {...field} />}
            />
          </div> */}

      {/* <div className="flex items-center">
            <label className="my-2 w-8 text-gray-700 text-md font-semibold">
              Kg
            </label>
            <Controller
              name={`ingredients.fermentables[${count}].quantity`}
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
        </div>
      ))} */}
    </div>
  );
};
