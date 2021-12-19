import React from "react";
import { Hops } from "../../redux/reducers/types";

type Props = {
  hops: Hops[];
};

export const HopsDetail: React.FC<Props> = ({ hops }) => {

  const bill = hops.reduce(function (prev, cur) {
    return prev + cur.quantity;
  }, 0);


  return (
    <div>
      <div className="pt-4 font-semibold text-2xl">
        <p>Hops</p>
      </div>

      <div className="grid grid-cols-6 py-4">
        <p className="col-span-1 font-semibold">Quantity</p>
        <p className="col-span-1 font-semibold">Variety</p>
        <p className="col-span-1 font-semibold">Use</p>
        <p className="col-span-1 font-semibold">Time</p>
        <p className="col-span-1 font-semibold">T° °C</p>
        <p className="col-span-1 font-semibold">Bill</p>
      </div>

      {hops.map((el, i) => (
        <div key={i} className="grid grid-cols-6 py-2">
          <p className="col-span-1">{el.quantity}</p>
          <p className="col-span-1">{el.name}</p>
          <p className="col-span-1">{el.use}</p>
          <p className="col-span-1">{el.time}</p>
          <p className="col-span-1">{el.temperature}</p>
          <p className="col-span-1">{(el.quantity / bill * 100).toFixed(1)}%</p>
        </div>
      ))}
    </div>
  );
};
