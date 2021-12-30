import React from "react";
import { useFormContext, Controller } from "react-hook-form";

export const Characteristics: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid-cols-2 flex gap-10 justify-center mx-8 p-6 bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <label className="text-gray-700 text-md font-semibold ">
          Original Gravity
        </label>
        <Controller
          name={`characteristics.original_gravity`}
          defaultValue={0}
          control={control}
          render={({ field }) => (
            <input
              placeholder="0"
              {...field}
              className="p-2 w-14 text-center shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
        />
        <span>{errors && errors.recipe?.characteristics?.original_gravity?.message}</span>
      </div>

      <div className="flex flex-col items-center gap-4">
        <label className="text-gray-700 text-md font-semibold ">
          Final Gravity
        </label>
        <Controller
          name={`characteristics.final_gravity`}
          defaultValue={0}
          control={control}
          render={({ field }) => (
            <input
              placeholder="0"
              {...field}
              className="p-2 w-14 text-center shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
        />
        <span>{errors && errors.recipe?.characteristics?.final_gravity?.message}</span>
      </div>

      <div className="flex flex-col items-center gap-4">
        <label className="text-gray-700 text-md font-semibold ">ABV</label>
        <Controller
          name={`characteristics.alcohol_by_volume`}
          defaultValue={0}
          control={control}
          render={({ field }) => (
            <input
              placeholder="0"
              {...field}
              className="p-2 w-14 text-center shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
        />
        <span>{errors && errors.recipe?.characteristics?.alcohol_by_volume?.message}</span>
      </div>

      <div className="flex flex-col items-center gap-4">
        <label className="text-gray-700 text-md font-semibold ">IBU</label>
        <Controller
          name={`characteristics.ibu`}
          defaultValue={0}
          control={control}
          render={({ field }) => (
            <input
              placeholder="0"
              {...field}
              className="p-2 w-14 text-center shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
        />
        <span>{errors && errors.recipe?.characteristics?.ibu?.message}</span>
      </div>

      <div className="flex flex-col items-center gap-4">
        <label className="text-gray-700 text-md font-semibold ">SRM</label>
        <Controller
          name={`characteristics.srm`}
          defaultValue={0}
          control={control}
          render={({ field }) => (
            <input
              placeholder="0"
              {...field}
              className="p-2 w-14 text-center shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
        />
        <span>{errors && errors.recipe?.characteristics?.srm?.message}</span>
      </div>
    </div>
  );
};
