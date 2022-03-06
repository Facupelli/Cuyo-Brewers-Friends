import React from "react";
import { Controller, useFormContext, useFieldArray } from "react-hook-form";
import { FaRegChartBar } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

export const Mash: React.FC<{}> = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "mash.guide",
    control,
  });

  return (
    <div className="mx-4 mt-8 md:m-8 p-4 bg-gray-100 shadow-form-shadow">
      <div className="flex justify-center items-baseline gap-2 border-b-2 border-mainC">
        <p className=" font-semibold text-2xl pb-4">Mash Guidelines</p>
        <div className="text-2xl">
          <FaRegChartBar />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-y-4 items-center">
        <div className="col-span-2 md:col-span-1 flex items-center gap-4">
          <label className="text-gray-700 text-md font-semibold ">
            Mash Thickness:
          </label>
          <Controller
            name={`mash.thickness`}
            defaultValue={3}
            control={control}
            render={({ field }) => (
              <input
                placeholder="0"
                {...field}
                className="p-2 text-center w-14 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
          <p className="text-sm">L/Kg</p>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center gap-4">
          <label className="text-gray-700 text-md font-semibold ">
            Grain T°:
          </label>
          <Controller
            name={`mash.grain_temperature`}
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
          <p className="text-sm">°C</p>
        </div>
      </div>

      {fields.map((field, index) => (
        <div key={field.id}>
          <section
            key={field.id}
            className="flex justify-between flex-wrap gap-y-4 bg-gray-200 p-2 mt-4"
          >
            <div className="flex flex-col ">
              <label className="font-semibold text-sm">Amount:</label>
              <div className="flex items-end gap-x-2">
                <Controller
                  name={`mash.guide[${index}].amount` as const}
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
                <p className="text-gray-700 text-sm">L</p>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm">Start Temp:</label>
              <div className="flex items-end gap-x-2">
                <Controller
                  name={`mash.guide[${index}].start_temp` as const}
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
                <p className="text-gray-700 text-sm">°C</p>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm">Target Temp:</label>
              <div className="flex items-end gap-x-2">
                <Controller
                  name={`mash.guide[${index}].target_temp` as const}
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
                <p className="text-gray-700 text-sm">°C</p>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm">Time:</label>
              <div className="flex items-end gap-x-2">
                <Controller
                  name={`mash.guide[${index}].time` as const}
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
                <p className="text-gray-700 text-sm">min</p>
              </div>
            </div>

            <div className="ml-auto">
              <button
                type="button"
                onClick={() => remove(index)}
                className="transition ease-in-out duration-150 col-span-1 text-xs ml-auto p-2 bg-transparent hover:bg-main text-main font-semibold hover:text-white  border border-main hover:border-transparent rounded"
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
        className="transition ease-in-out duration-150 my-4 text-sm bg-transparent hover:bg-main text-main font-semibold hover:text-white p-2 border border-main hover:border-transparent rounded"
      >
        ADD STEP +
      </button>
    </div>
  );
};
