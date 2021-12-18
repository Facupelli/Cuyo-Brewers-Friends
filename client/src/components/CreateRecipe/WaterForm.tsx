import React, { useState } from "react";
import { WaterProfile } from "../../redux/reducers/types";
import { useForm, Controller, useFormContext } from "react-hook-form";

export const WaterForm: React.FC<{}> = () => {
  const [count, setCount] = useState(1);

  const { control } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<WaterProfile>();

  return (
    <div className="m-8 p-4 bg-orange-100">
      <div>
        <p className="font-semibold text-2xl mb-4">Water Chemistry</p>
      </div>
      <div className="flex gap-6 p-6 justify-around bg-orange-200">
        <div className="flex flex-col items-center gap-4">
          <label className="text-gray-700 text-md font-semibold">Ca+2</label>
          <Controller
            name={`ingredients.water_profile.calcium`}
            defaultValue={0}
            control={control}
            render={({ field }) => (
              <input
                placeholder="0"
                {...field}
                className="p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
