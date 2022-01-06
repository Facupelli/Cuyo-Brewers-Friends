import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const TitleInfo: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="flex mx-8 mt-8 gap-8 bg-gray-50">
        <div className="p-4">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Title
          </label>
          <Controller
            name="title"
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
          <div className="pt-4 text-orange-600 text-sm">
            <span>{errors && errors.title?.message}</span>
          </div>
        </div>

        <div className="p-4">
          <label className="my-2 text-gray-700 text-md font-semibold">
            Brewery
          </label>
          <Controller
            name="brewery"
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
    </div>
  );
};
