import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaMicroscope } from "react-icons/fa";
import { fermentis } from "../../media/beer_ingredients/yeast/fermentis";

type Props = {
  setYeastAtt: React.Dispatch<React.SetStateAction<number>>;
};

export const YeastForm: React.FC<Props> = ({ setYeastAtt }) => {
  const { control, watch, register } = useFormContext();

  const att = watch("ingredients.yeast.attenuation");

  const yeastSelected = watch("ingredients.yeast.name");

  const getYeastAtt = () => {
    return fermentis
      .filter((el) => el.name === yeastSelected)
      .map((el) => el.attenuation)[0];
  };

  const attAcordToYeast = getYeastAtt();

  useEffect(() => {
    if (att && att !== 75) setYeastAtt(att);
  }, [att, setYeastAtt]);

  return (
    <div className="mx-4 mt-8 md:m-8 p-4 bg-gray-100 shadow-form-shadow">
      <div className="flex justify-center items-baseline gap-2 border-b-2 border-mainC">
        <p className="font-semibold text-2xl pb-4">Yeast</p>
        <div className="text-xl">
          <FaMicroscope />
        </div>
      </div>

      <div className="grid grid-cols-3 my-4 gap-4 ">
        <label className="col-span-1 text-gray-700 text-md font-semibold ">
          Yeast
        </label>
        <select
          {...register(`ingredients.yeast.name`)}
          defaultValue={""}
          className="col-span-2 bg-white border border-blue-200  text-gray-700 py-2 md:p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-mainC2"
        >
          <option value="" disabled>
            Select Yeast
          </option>
          {fermentis.map((el) => (
            <option key={el.name}>{el.name}</option>
          ))}
        </select>
      </div>

      {attAcordToYeast && (
        <div className="flex flex-wrap items-center my-4 gap-2">
          <label className="text-gray-500 text-xs font-semibold ">
            Attenuation of yeast selected
          </label>
          <p className="text-gray-500 text-xs font-semibold ">
            {attAcordToYeast * 100} %
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1 grid grid-cols-3 items-center gap-4">
          <label className="col-span-2 text-gray-700  font-semibold ">
            Attenuation (%)
          </label>
          <Controller
            name={`ingredients.yeast.attenuation`}
            defaultValue="75"
            control={control}
            render={({ field }) => (
              <input
                placeholder="0"
                {...field}
                className="p-2 col-span-1 text-center  shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
        </div>

        <div className="col-span-2 md:col-span-1 grid grid-cols-3 items-center gap-4">
          <label className="col-span-2 text-gray-700 text-md font-semibold ">
            Quantity (g)
          </label>
          <Controller
            name={`ingredients.yeast.quantity`}
            defaultValue="0"
            control={control}
            render={({ field }) => (
              <input
                placeholder="0"
                {...field}
                className="p-2 col-span-1 text-center shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
