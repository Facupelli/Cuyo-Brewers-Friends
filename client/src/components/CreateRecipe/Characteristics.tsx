import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { srmToHex } from "../../utils/OGCalculator";
import { IoBeer } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
import { ModalCharacteristics } from "./ModalCharacteristics";

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
    setValue,
    formState: { errors },
  } = useFormContext();

  //----------------- CHARACTERISTICS VALUES ---------------------------------

  const getOg = () => {
    const originalGravity: number = Number(
      ((ogPoints * eff) / 100 / (batch_size * 0.2641722)).toFixed(0)
    );

    if (originalGravity <= 0) {
      return "0";
    }
    if (originalGravity >= 100) {
      return "1." + originalGravity;
    }
    if (originalGravity >= 10) {
      return "1.0" + originalGravity;
    }
    if (originalGravity < 10) {
      return "1.00" + originalGravity;
    }
  };

  const originalGravity: number = Number(getOg());

  const getFg = () => {
    let finalG: number = Number(
      (originalGravity - (originalGravity - 1) * (yeastAtt / 100)).toFixed(3)
    );

    if (originalGravity === 0) {
      finalG = 0;
      return finalG;
    }
    return finalG;
  };

  const finalGravity = getFg();

  const abv = ((originalGravity - finalGravity) * 131.25).toFixed(2);

  const srm: string = (1.4922 * (mcu * 0.6859)).toFixed(1);

  const [color, setColor] = useState<string>();

  //----------------------------  USE EFFECT  -----------------------------------------------

  useEffect(() => {
    if (Number(srm) > 30) {
      setColor("black");
    } else {
      setColor(srmToHex(srm));
    }
  }, [srm]);

  useEffect(() => {
    setValue("characteristics.original_gravity", originalGravity);
    setValue("characteristics.final_gravity", finalGravity);
    setValue("characteristics.alcohol_by_volume", abv);
    setValue("characteristics.srm", srm);
  }, [setValue, originalGravity, finalGravity, abv, srm]);

  // ---------------------------------------------------------------------
  const [modal, setModal] = useState(false);

  const handleQusetionClick = () => {
    setModal(true);
  };

  const message = `Los resultados (OG, FG, ABV, SRM) son solamente aproximaciones.
  Los verdaderos resultados dependeran de la cualidades del equipo y
  las variables que puedan o no ser controladas asi como tambien de
  la calidad de los ingredientes utilizados`;

  return (
    <>
      {modal && <ModalCharacteristics setModal={setModal} message={message} />}
      <div className="mx-4 mt-8 md:mx-8 p-3 md:p-6 bg-gray-100 shadow-form-shadow">
        <div
          onClick={handleQusetionClick}
          className="cursor-pointer text-gray-400 text-lg flex justify-end "
        >
          <FaQuestionCircle />
        </div>
        <div className="flex flex-wrap gap-10 justify-center">
          <div className="flex flex-col items-center gap-y-2">
            <label className="text-gray-700 text-md font-semibold ">
              Original Gravity
            </label>

            <p className="p-2 text-mainC2 font-semibold text-3xl">
              {originalGravity && originalGravity}
            </p>
          </div>

          <div className="flex flex-col items-center gap-y-2">
            <label className="text-gray-700 text-md font-semibold ">
              Final Gravity
            </label>
            <p className="p-2 text-mainC2 font-semibold text-3xl">
              {yeastAtt && finalGravity && finalGravity}
            </p>
          </div>

          <div className="flex flex-col items-center gap-y-2">
            <label className="text-gray-700 text-md font-semibold ">
              ABV %
            </label>
            <p className="text-mainC2 p-2 font-semibold text-3xl">
              {originalGravity && finalGravity && abv}
            </p>
          </div>

          <div className="flex flex-col items-center gap-y-2">
            <label className="text-gray-700 text-md font-semibold ">IBU</label>
            <Controller
              name={`characteristics.ibu`}
              defaultValue={0}
              control={control}
              render={({ field }) => (
                <input
                  placeholder="0"
                  {...field}
                  className="p-2 w-14 text-2xl text-center border font-semibold text-mainC2 shadow-input appearance-none rounded  leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            />
            <span>
              {errors && errors.recipe?.characteristics?.ibu?.message}
            </span>
          </div>

          <div className="flex flex-col items-center gap-y-2">
            <label className="text-gray-700 text-md font-semibold ">SRM</label>
            {srm && <p className="p-2 text-mainC2 font-semibold text-3xl">{srm}</p>}
          </div>

          <div className="flex flex-col items-center gap-y-2">
            <label className="text-gray-700 text-md font-semibold ">
              Color
            </label>
            {srm && (
              <div className={`p-2 text-4xl text-${color}`}>
                <IoBeer />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
