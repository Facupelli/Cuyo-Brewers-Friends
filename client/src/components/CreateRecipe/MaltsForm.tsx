import React, { useState } from "react";
import { Fermentables } from "../../redux/reducers/types";
import { useForm, Controller, useFormContext } from "react-hook-form";

export const MaltsForm: React.FC<{}> = () => {
  const [count, setCount] = useState(1);

  const { control } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Fermentables>();

  const addMalt = () => {
    setCount(count + 1);
  };

  const deleteMalt = () => {
    setCount(count - 1);
  };

  return (
    <div className="m-8 p-4 bg-orange-100">
      <div  className="flex justify-center border-b-2 border-orange-300">
        <p className="font-semibold text-2xl pb-4">Fermentables</p>
      </div>
      <div className="flex gap-8 py-4 ">
        <p onClick={addMalt} className="cursor-pointer bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white p-2 border border-orange-500 hover:border-transparent rounded">
          Add Malt +
        </p>
        {count === 1 ? null : (
          <p onClick={deleteMalt} className="cursor-pointer bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white p-2 border border-orange-500 hover:border-transparent rounded">
            Delete Last Malt -
          </p>
        )}
      </div>

      {[...Array(count)].map((el, count) => (
        <div className="p-4 mt-4 bg-orange-200">
          {/* <div>
            {hopsList && (
              <select {...register("name")}>
                {hopsList.map((el) => (
                  <option>{el.Name}</option>
                ))}
              </select>
            )}
          </div> */}
          <div className="flex items-center">
            <label className="my-2 w-8 text-gray-700 text-md font-semibold">Malt</label>
            <Controller
              name={`ingredients.fermentables[${count}].name`}
              defaultValue=""
              control={control}
              render={({ field }) => <input className="my-2 ml-4 p-2 shadow appearance-none rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Pale" {...field} />}
            />
          </div>

          <div className="flex items-center">
            <label className="my-2 w-8 text-gray-700 text-md font-semibold">Kg</label>
            <Controller
              name={`ingredients.fermentables[${count}].quantity`}
              defaultValue={0}
              control={control}
              render={({ field }) => <input className="my-2 ml-4 p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="0" {...field} />}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
