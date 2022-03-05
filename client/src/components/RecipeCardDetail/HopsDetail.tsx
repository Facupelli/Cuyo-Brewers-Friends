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
    <div className="mb-6">
      <div className="py-4 font-semibold text-2xl text-brown1">
        <p>Hops</p>
      </div>

      <div className="grid grid-cols-6 md:grid-cols-7 p-2 pb-4 bg-mainC ">
        <p className="col-span-1 font-semibold">Quantity g</p>
        <p className="col-span-1 font-semibold">Variety</p>
        <p className="hidden md:block md:col-span-1 font-semibold">AA</p>
        <p className="col-span-1 font-semibold">Use</p>
        <p className="col-span-1 font-semibold">Time</p>
        <p className="col-span-1 font-semibold">T° <span className="text-sm text-gray-600">°C</span></p>
        <p className="col-span-1 font-semibold ">Bill</p>
      </div>

      {hops.map((el, i) => (
        <div key={i} className="grid grid-cols-6 md:grid-cols-7 p-2 bg-bgMain text-ellipsis">
          <p className="col-span-1">{el.quantity}</p>
          <p className="col-span-1">{el.name.name}</p>
          <p className="hidden md:block md:col-span-1">-</p>
          <p className="col-span-1">{el.use}</p>
          <p className="col-span-1">{el.time}</p>
          <p className="col-span-1">{el.temperature}</p>
          <p className="col-span-1">{(el.quantity / bill * 100).toFixed(1)}%</p>
        </div>
      ))}
          <p className="font-semibold p-2">{bill} g</p>

    </div>
  );
};
