import React, { useEffect } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { fermentables } from "../../media/beer_ingredients/fermentables";
import { FaTrash } from "react-icons/fa";
import { ogCalculator, srmCalculator } from "../../utils/OGCalculator";
import { GiWheat } from "react-icons/gi";
import Select from "react-select";

type Props = {
  setOgPoints: React.Dispatch<React.SetStateAction<any>>;
  batch_size: number;
  setMcu: React.Dispatch<React.SetStateAction<any>>;
};

export const MaltsForm: React.FC<Props> = ({
  setOgPoints,
  batch_size,
  setMcu,
}) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "ingredients.fermentables",
    control,
  });

  const fermentableOptions = fermentables.map((el) => ({
    name: el.name,
    label: el.name,
    potential: el.potential,
    color: el.color,
    yield: el.yield,
  }));

  const maltSelected = useWatch({
    name: "ingredients.fermentables",
    control,
  });

  useEffect(() => {
    if (maltSelected) {
      setOgPoints(ogCalculator(maltSelected));
      setMcu(srmCalculator(maltSelected, batch_size));
    }
  }, [maltSelected, setOgPoints, setMcu, batch_size]);

  return (
    <div className="m-8 p-4 bg-gray-100">
      <div className="flex justify-center items-baseline gap-2 border-b-2 border-blueLight">
        <p className="font-semibold text-2xl pb-4">Fermentables</p>
        <div className="text-2xl">
          <GiWheat />
        </div>
      </div>

      {fields.map((field, index) => (
        <div key={field.id}>
          <section key={field.id} className="bg-blue-100">
            <div className="grid grid-cols-3 items-center gap-4 p-4 mt-4 ">
              <label className="col-span-1  text-gray-700 text-md font-semibold">
                Malt:
              </label>
              <Controller
                control={control}
                name={`ingredients.fermentables[${index}].name`}
                defaultValue={{
                  name: "1. American Standard",
                  label: "1. American Standard",
                }}
                render={({ field: { onChange, value, name, ref } }) => (
                  <div className="col-span-2">
                    <Select options={fermentableOptions} onChange={onChange} />
                  </div>
                )}
              />

              <label className="col-span-1 text-gray-700 text-md font-semibold">
                Kg:
              </label>

              <Controller
                name={`ingredients.fermentables[${index}].quantity` as const}
                defaultValue={0}
                control={control}
                render={({ field }) => (
                  <input
                    className="col-span-1 p-2 w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="0"
                    {...field}
                  />
                )}
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className="transition ease-in-out duration-150 col-span-1 ml-auto p-2 bg-transparent hover:bg-brown1 text-brown1 font-semibold hover:text-white  border border-brown1 hover:border-transparent rounded"
              >
                <FaTrash />
              </button>
            </div>
          </section>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            quantity: 0,
          })
        }
        className="transition ease-in-out duration-150 my-4 text-sm bg-transparent hover:bg-blue-500 text-brown1 font-semibold hover:text-white p-2 border border-blueLight hover:border-transparent rounded"
      >
        ADD MALT +
      </button>
    </div>
  );
};
