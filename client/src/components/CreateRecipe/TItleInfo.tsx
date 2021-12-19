import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const TitleInfo: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex mx-8 mt-8 gap-8 bg-orange-100">
      <div className="p-4">
        <label className="my-2 text-gray-700 text-md font-semibold">
          Title
        </label>
        <Controller
          name="recipe.title"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <input
              placeholder="Hop Odisey"
              className="ml-4 p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...field}
            />
          )}
        />
        <span>{errors && errors.recipe?.title?.message}</span>
      </div>

      <div className="p-4">
        <label className="my-2 text-gray-700 text-md font-semibold">
          Brewery
        </label>
        <Controller
          name="recipe.brewery"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <input
              placeholder="--"
              className="ml-4 p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
};
