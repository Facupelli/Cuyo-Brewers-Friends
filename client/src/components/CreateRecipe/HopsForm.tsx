import React from "react";
import { Hops } from "../../redux/reducers/types";
import { useForm } from "react-hook-form";

import { hopsList } from "../../media/beer_ingredients/hopsList";

export const HopsForm: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Hops>();

  return (
    <form>
      <div>
        <label htmlFor="Sub_Category">Hops</label>
        {hopsList && (
          <select {...register("name")}>
            {hopsList.map((el) => (
              <option>{el.Name}</option>
            ))}
          </select>
        )}
      </div>
    </form>
  );
};
