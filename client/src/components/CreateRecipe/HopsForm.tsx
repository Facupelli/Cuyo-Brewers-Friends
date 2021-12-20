import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { hopsList } from "../../media/beer_ingredients/hopsList";

interface HopNames {
  name: string;
  id: number;
}

export const HopsForm: React.FC<{}> = () => {
  const [count, setCount] = useState(1);

  const { control, register } = useFormContext();

  const hopNames: HopNames[] = hopsList.map((el) => ({
    name: el.Name,
    id: el.Id,
  }));

  const addHop = () => {
    setCount(count + 1);
  };
  const deleteHop = () => {
    setCount(count - 1);
  };

  return (
    <div className="m-8 p-4 bg-orange-100">
      <div className="flex justify-center border-b-2 border-orange-300">
        <p className="font-semibold text-2xl pb-4">Hops</p>
      </div>
      <div className="flex gap-8 pt-4">
        <p
          onClick={addHop}
          className="cursor-pointer bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white p-2 border border-orange-500 hover:border-transparent rounded"
        >
          Add Hop +
        </p>

        {count === 1 ? null : (
          <p
            onClick={deleteHop}
            className="cursor-pointer bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white p-2 border border-orange-500 hover:border-transparent rounded"
          >
            Delete Last Hop -
          </p>
        )}
      </div>

      {/* --------------------- PRIMERA LINEA ---------------------------------------- */}

      {[...Array(count)].map((el, count) => (
        <div key={count} className="p-4 mt-4 bg-orange-200">
          <div className="flex gap-4 items-center">
            <label className="my-2 text-gray-700 text-md font-semibold">
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

            {hopsList && (
              <select
                {...register(`ingredients.hops[${count}].name`)}
                defaultValue=""
                className="bg-white border border-orange-200 text-gray-700 p-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              >
                {hopNames.map((el, i) => (
                  <option key={i}>{el.name}</option>
                ))}
              </select>
            )}

            {/* <div>
              <label className="my-2 text-gray-700 text-md font-semibold">
                AA
              </label>
            </div> */}
          </div>

          {/* ----------------------- SEGUNDA LINEA ----------------------------------------------- */}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
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
              <p className="text-xs">min (days for DH)</p>
            </div>
            <div>
              <select
                {...register(`ingredients.hops[${count}].use`)}
                defaultValue=""
                className="bg-white border border-orange-200 text-gray-700 p-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              >
                <option disabled>Select Use</option>
                <option >Boil</option>
                <option>Dry Hop</option>
                <option>First Wort Hop</option>
                <option>Hop Stand</option>
                <option>Hop Back</option>
                <option>Mash</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label>T°</label>
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
              <p>°C</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
