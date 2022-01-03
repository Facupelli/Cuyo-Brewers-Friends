import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { srmToHex } from "../../utils/OGCalculator";

type Props = {
  eff: number;
  ogPoints: number;
  batch_size: number;
  yeastAtt: number;
  mcu: number;
};

export const Characteristics: React.FC<Props> = ({
  eff,
  ogPoints,
  batch_size,
  yeastAtt,
  mcu,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  //----------------- CHARACTERISTICS VALUES ---------------------------------

  const originalGravity = Number(
    "1.0" + ((ogPoints * eff) / 100 / (batch_size * 0.2641722)).toFixed(0)
  );

  const finalGravity = Number(
    (originalGravity - (originalGravity - 1) * (yeastAtt / 100)).toFixed(3)
  );

  const abv = ((originalGravity - finalGravity) * 131.25).toFixed(2);

  const srm: string = (1.4922 * (mcu * 0.6859)).toFixed(1);

  const [color, setColor] = useState<string>();

  //---------------------------------------------------------------------------

  useEffect(() => {
    if (Number(srm) > 30) {
      setColor("black");
    } else {
      setColor(srmToHex(srm));
    }
  }, [srm]);

  return (
    <div className="grid-cols-2 flex gap-10 justify-center mx-8 p-6 bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <label className="text-gray-700 text-md font-semibold ">
          Original Gravity
        </label>
        {/* <Controller
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
        <span>{errors && errors.recipe?.characteristics?.original_gravity?.message}</span> */}
        {eff && ogPoints && batch_size && originalGravity && (
          <p className="text-blueLight font-semibold text-3xl">
            {originalGravity}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <label className="text-gray-700 text-md font-semibold ">
          Final Gravity
        </label>
        {/* <Controller
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
        <span>
          {errors && errors.recipe?.characteristics?.final_gravity?.message}
        </span> */}
        {yeastAtt && finalGravity && (
          <p className="text-blueLight font-semibold text-3xl">
            {finalGravity}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <label className="text-gray-700 text-md font-semibold ">ABV %</label>
        {/* <Controller
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
        <span>
          {errors && errors.recipe?.characteristics?.alcohol_by_volume?.message}
        </span> */}
        {originalGravity && finalGravity && (
          <p className="text-blueLight font-semibold text-3xl">{abv}</p>
        )}
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
        {/* <Controller
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
        <span>{errors && errors.recipe?.characteristics?.srm?.message}</span> */}
        {srm && <p className="text-blueLight font-semibold text-3xl">{srm}</p>}
      </div>

      <div className="flex flex-col items-center gap-4">
        <label className="text-gray-700 text-md font-semibold ">Color</label>
        {srm && <div className={`p-4 bg-${color}`}></div>}
      </div>
    </div>
  );
};
