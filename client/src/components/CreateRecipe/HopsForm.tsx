import React, { useState } from "react";
import { Hops } from "../../redux/reducers/types";
import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";

import { hopsList } from "../../media/beer_ingredients/hopsList";

interface HopNames {
  name: string;
  label: string;
}

export const HopsForm: React.FC<{}> = () => {
  const [count, setCount] = useState(1);

  const { control } = useFormContext();

  const hopNames: HopNames[] = hopsList.map((el) => ({
    name: el.Name,
    label: el.Name,
  }));

  const addHop = () => {
    setCount(count + 1);
  };
  const deleteHop = () => {
    setCount(count - 1);
  };

  return (
    <div className="m-8 p-4 bg-orange-100">
      <div>
        <p className="font-semibold text-2xl">Hops</p>
      </div>
      <div className="flex gap-8 py-4">
        <p
          onClick={addHop}
          className="cursor-pointer bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white p-2 border border-blue-500 hover:border-transparent rounded"
        >
          Add Hop +
        </p>

        {count === 1 ? null : (
          <p
            onClick={deleteHop}
            className="cursor-pointer bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white p-2 border border-blue-500 hover:border-transparent rounded"
          >
            Delete Last Hop -
          </p>
        )}
      </div>

      {[...Array(count)].map((el, count) => (
        <div className="p-4 mt-4 bg-orange-200">
          <div className="flex gap-4 items-center">
            {hopsList && (
              <Controller
                name={`ingredients.hops[${count}].name`}
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Select
                    className="my-2 w-full"
                    placeholder="Select Hop.."
                    options={hopNames}
                    {...field}
                  />
                )}
              />
            )}
            <label className='my-2 text-gray-700 text-md font-semibold'>g</label>
            <Controller
              name={`ingredients.hops[${count}].quantity`}
              defaultValue={0}
              control={control}
              render={({ field }) => (
                <input className="p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="0" {...field} />
              )}
            />
          </div>

          <div>
            <label className="my-2 text-gray-700 text-md font-semibold">Boil Time</label>
            <Controller
              name={`ingredients.hops[${count}].boil_time`}
              defaultValue={0}
              control={control}
              render={({ field }) => (
                <input className="my-2 ml-4 p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="0" {...field} />
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
