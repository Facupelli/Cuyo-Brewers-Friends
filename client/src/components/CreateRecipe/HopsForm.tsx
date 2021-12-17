import React, { useState } from "react";
import { Hops } from "../../redux/reducers/types";
import { useForm } from "react-hook-form";

import { hopsList } from "../../media/beer_ingredients/hopsList";

export const HopsForm: React.FC<{}> = () => {
  const [count, setCount] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Hops>();

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
              <select {...register("name")}>
                {hopsList.map((el) => (
                  <option>{el.Name}</option>
                ))}
              </select>
            )}
          </div>

          <input placeholder="0" {...register("quantity")} />
          <div>
            <label>Boil Time</label>
            <input placeholder="0" {...register("boil_time")} />
          </div>
        </div>
      ))}
    </div>
  );
};
