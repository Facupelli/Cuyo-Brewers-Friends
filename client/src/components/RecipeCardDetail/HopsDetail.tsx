import React from "react";
import { Hops } from "../../redux/reducers/types";

type Props = {
  hops: Hops[];
};

export const HopsDetail: React.FC<Props> = ({ hops }) => {


  return (
    <div>
      <div className="pt-4 font-semibold text-xl">
        <p>Hops</p>
      </div>

      <div className="grid grid-cols-4 py-4">
        <p className="col-span-1">Quantity</p>
        <p className="col-span-1">Variety</p>
        <p className="col-span-1">Use</p>
        <p className="col-span-1">Time</p>
      </div>

      {hops.map((el, i) => (
        <div key={i} className="grid grid-cols-4 py-2">
          <p className="col-span-1">{el.quantity}</p>
          <p className="col-span-1">{el.name}</p>
          <p className="col-span-1">-</p>
          <p className="col-span-1">{el.boil_time}</p>
        </div>
      ))}
    </div>
  );
};
