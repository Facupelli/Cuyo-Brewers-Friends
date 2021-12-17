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
    <div>
      <div className="flex gap-4 p-4">
        <div className="flex flex-col gap-4">
          <label>Ca+2</label>
          <Controller
              name={`ingredients.water_profile.calcium`}
              defaultValue={0}
              control={control}
              render={({ field }) => <input placeholder="0" {...field}  className="w-12" />}
            />
        </div>
        <div className="flex flex-col gap-4">
          <label>Mg+2</label>
          <Controller
              name={`ingredients.water_profile.magnesium`}
              defaultValue={0}
              control={control}
              render={({ field }) => <input placeholder="0" {...field}  className="w-12" />}
            />
        </div>
        <div className="flex flex-col gap-4">
          <label>Na+</label>
          <Controller
              name={`ingredients.water_profile.sodium`}
              defaultValue={0}
              control={control}
              render={({ field }) => <input placeholder="0" {...field}  className="w-12" />}
            />
        </div>
        <div className="flex flex-col gap-4">
          <label>Cl-</label>
          <Controller
              name={`ingredients.water_profile.chlorine`}
              defaultValue={0}
              control={control}
              render={({ field }) => <input placeholder="0" {...field}  className="w-12" />}
            />
        </div>
        <div className="flex flex-col gap-4">
          <label>SO4-2</label>
          <Controller
              name={`ingredients.water_profile.sulfate`}
              defaultValue={0}
              control={control}
              render={({ field }) => <input placeholder="0" {...field}  className="w-12" />}
            />
        </div>
        <div className="flex flex-col gap-4">
          <label>HCO3-</label>
          <Controller
              name={`ingredients.water_profile.bicarbonate`}
              defaultValue={0}
              control={control}
              render={({ field }) => <input placeholder="0" {...field}  className="w-12" />}
            />
        </div>
      </div>
    </div>
  );
};
