import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { BiWater } from "react-icons/bi";

export const WaterForm: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="mx-4 mt-8 md:m-8 p-4 bg-gray-100 shadow-form-shadow">
      <div className="flex justify-center items-baseline gap-2 border-b-2 border-mainC">
        <p className=" font-semibold text-2xl pb-4">Water Chemistry</p>
        <div className="text-2xl">
          <BiWater />
        </div>
      </div>
      <div className="flex flex-wrap gap-6 mt-4 p-6 justify-around bg-gray-200">
        <div className="flex flex-col items-center gap-4">
          <label className="text-gray-700 text-md font-semibold ">Ca+2</label>
          <Controller
            name={`ingredients.water_profile.calcium`}
            defaultValue="0"
            control={control}
            render={({ field }) => (
              <input
                placeholder="0"
                {...field}
                className="p-2 text-center w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <label className="text-gray-700 text-md font-semibold">Mg+2</label>
          <Controller
            name={`ingredients.water_profile.magnesium`}
            control={control}
            defaultValue="0"
            render={({ field }) => (
              <input
                placeholder="0"
                {...field}
                className="p-2 text-center w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <label className="text-gray-700 text-md font-semibold">Na+</label>
          <Controller
            name={`ingredients.water_profile.sodium`}
            control={control}
            defaultValue="0"
            render={({ field }) => (
              <input
                placeholder="0"
                {...field}
                className="p-2 text-center w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <label className="text-gray-700 text-md font-semibold">Cl-</label>
          <Controller
            name={`ingredients.water_profile.chlorine`}
            control={control}
            defaultValue="0"
            render={({ field }) => (
              <input
                placeholder="0"
                {...field}
                className="p-2 text-center w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <label className="text-gray-700 text-md font-semibold">SO4-2</label>
          <Controller
            name={`ingredients.water_profile.sulfate`}
            control={control}
            defaultValue="0"
            render={({ field }) => (
              <input
                placeholder="0"
                {...field}
                className="p-2 text-center w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <label className="text-gray-700 text-md font-semibold">HCO3-</label>
          <Controller
            name={`ingredients.water_profile.bicarbonate`}
            control={control}
            defaultValue="0"
            render={({ field }) => (
              <input
                placeholder="0"
                {...field}
                className="p-2 text-center w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
