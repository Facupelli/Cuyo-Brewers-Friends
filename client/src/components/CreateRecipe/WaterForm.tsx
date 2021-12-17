import React, { useState } from "react";
import { WaterProfile } from "../../redux/reducers/types";
import { useForm } from "react-hook-form";

export const WaterForm: React.FC<{}> = () => {
  const [count, setCount] = useState(1);

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
          <input placeholder="0" {...register("calcium")} className="w-12"/>
        </div>
        <div className="flex flex-col gap-4">
          <label>Mg+2</label>
          <input placeholder="0" {...register("magnesium")} className="w-12" />
        </div>
        <div className="flex flex-col gap-4">
          <label>Na+</label>
          <input placeholder="0" {...register("sodium")} className="w-12" />
        </div>
        <div className="flex flex-col gap-4">
          <label>Cl-</label>
          <input placeholder="0" {...register("chlorine")} className="w-12" />
        </div>
        <div className="flex flex-col gap-4">
          <label>SO4-2</label>
          <input placeholder="0" {...register("sulfate")} className="w-12" />
        </div>
        <div className="flex flex-col gap-4">
          <label>HCO3-</label>
          <input placeholder="0" {...register("bicarbonate")} className="w-12" />
        </div>
      </div>
    </div>
  );
};
