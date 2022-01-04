import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {FaMicroscope} from 'react-icons/fa'

type Props = {
    setYeastAtt: React.Dispatch<React.SetStateAction<any>>;
}

export const YeastForm: React.FC<Props> = ({setYeastAtt}) => {
  const { control, watch } = useFormContext();

  const att = watch('ingredients.yeast.attenuation')

  useEffect(() => {
    setYeastAtt(att)
  },[att, setYeastAtt])

  return (
    <div className="m-8 p-4 bg-gray-100">
      <div className="flex justify-center items-baseline gap-2 border-b-2 border-blueLight">
        <p className="font-semibold text-2xl pb-4">Yeast</p>
        <div className="text-xl">
            <FaMicroscope />
        </div>
      </div>
      <div className="flex items-center my-4 gap-4">
        <label className="text-gray-700 text-md font-semibold ">Attenuation (%)</label>
        <Controller
          name={`ingredients.yeast.attenuation`}
          defaultValue={75}
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
  );
};
