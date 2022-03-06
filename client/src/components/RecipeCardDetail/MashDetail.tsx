import React from "react";
import { Hops, Mash } from "../../redux/reducers/types";

type Props = {
  mash: Mash;
};

export const MashDetail: React.FC<Props> = ({ mash }) => {

  return (
    <div className="mb-6">
      <div className="py-4 font-semibold text-2xl text-main">
        <p>Mash Guidelines</p>
      </div>

      <div className="">
          <p>Mash start thickness: <span className="font-semibold">{mash.thickness}</span></p>
          <p>Mash start grain temp: <span className="font-semibold">{mash.grain_temperature}</span></p>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-4 p-2 pb-4 bg-mainC ">
          <p className="col-span-1 font-semibold">Amount (L)</p>
          <p className="col-span-1 font-semibold">Start Temp (°C)</p>
          <p className="col-span-1 font-semibold">Target Temp (°C)</p>
          <p className="col-span-1 font-semibold ">Time (min)</p>
        </div>
      </div>

      {mash.guide && mash.guide.map((el, i) => (
        <div
          key={i}
          className="grid grid-cols-4 p-2 bg-bgMain text-ellipsis"
        >
          <p className="col-span-1">{el.amount}</p>
          <p className="col-span-1">{el.start_temp}</p>
          <p className="col-span-1">{el.target_temp}</p>
          <p className="col-span-1">{el.time}</p>
        </div>
      ))}
    </div>
  );
};
