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
    <div>
      <div className="flex gap-8">
        <p onClick={addMalt} className="cursor-pointer">
          Add Malt +
        </p>
        {count === 1 ? null : (
          <p onClick={deleteMalt} className="cursor-pointer">
            Delete Last Malt -
          </p>
        )}
      </div>

      {[...Array(count)].map((el, count) => (
        <div className="p-4">
          {/* <div>
            {hopsList && (
              <select {...register("name")}>
                {hopsList.map((el) => (
                  <option>{el.Name}</option>
                ))}
              </select>
            )}
          </div> */}
          <div className="flex">
            <label>Malt</label>
            <Controller
              name={`ingredients.fermentables[${count}].name`}
              defaultValue=""
              control={control}
              render={({ field }) => <input placeholder="Pale" {...field} />}
            />
          </div>

          <div className="flex">
            <label>Kg</label>
            <Controller
              name={`ingredients.fermentables[${count}].quantity`}
              defaultValue={0}
              control={control}
              render={({ field }) => <input placeholder="0" {...field} />}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
