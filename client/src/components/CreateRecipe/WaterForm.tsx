import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const WaterForm: React.FC<{}> = () => {

  const { control } = useFormContext();

  return (
    <div className="mx-8 mb-6 p-4 bg-gray-100">
      
      <div className="flex justify-center border-b-2 border-blueLight">
        <p className=" font-semibold text-2xl pb-4">Water Chemistry</p>
      </div>
      <div className="flex gap-6 mt-4 p-6 justify-around bg-blue-100">
        <div className="flex flex-col items-center gap-4">
          <label className="text-gray-700 text-md font-semibold ">Ca+2</label>
          <Controller
            name={`ingredients.water_profile.calcium`}
            defaultValue={0}
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
            defaultValue={0}
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
          <label className="text-gray-700 text-md font-semibold">Na+</label>
          <Controller
            name={`ingredients.water_profile.sodium`}
            defaultValue={0}
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
          <label className="text-gray-700 text-md font-semibold">Cl-</label>
          <Controller
            name={`ingredients.water_profile.chlorine`}
            defaultValue={0}
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
          <label className="text-gray-700 text-md font-semibold">SO4-2</label>
          <Controller
            name={`ingredients.water_profile.sulfate`}
            defaultValue={0}
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
          <label className="text-gray-700 text-md font-semibold">HCO3-</label>
          <Controller
            name={`ingredients.water_profile.bicarbonate`}
            defaultValue={0}
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
      </div>
    </div>
  );
};
