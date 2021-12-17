import React, { useState } from "react";
import { Fermentables } from "../../redux/reducers/types";
import { useForm } from "react-hook-form";

export const MaltsForm: React.FC<{}> = () => {
  const [count, setCount] = useState(1);

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

      {[...Array(count)].map((el) => (
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
          
          <input placeholder='Pale' {...register('name')} />
          <input placeholder="0" {...register("quantity")} />
        </div>
      ))}
    </div>
  );
};
