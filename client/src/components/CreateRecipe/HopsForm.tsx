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
    <div>
      <div className="flex gap-8">
        <p onClick={addHop} className="cursor-pointer">
          Add Hop +
        </p>

        {count === 1 ? null : (
          <p onClick={deleteHop} className="cursor-pointer">
            Delete Last Hop -
          </p>
        )}
      </div>

      {[...Array(count)].map((el) => (
        <div className="p-4">
          <div>
            {hopsList && (
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Select options={hopNames} {...field} />}
              />
            )}
          </div>

          <Controller
            name="quantity"
            control={control}
            render={({ field }) => <input placeholder="0" {...field} />}
          />

          <div>
            <label>Boil Time</label>
            <Controller
              name="boil_time"
              control={control}
              render={({ field }) => <input {...field} />}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
