import React from "react";
import { Fermentables } from "../../redux/reducers/types";

type Props = {
  fermentables: Fermentables[];
};

export const FermentablesDetail: React.FC<Props> = ({ fermentables }) => {

  const bill = fermentables.reduce(function (prev, cur) {
    return prev + cur.quantity;
  }, 0);

  return (
    <div className="mb-6">
      <div className="py-4 font-semibold text-2xl text-brown1">
        <p>Fermentables</p>
      </div>

      <div className="grid grid-cols-4 pb-4">
        <p className="col-span-1 font-semibold">Quantity kg</p>
        <p className="col-span-2 font-semibold">Fermentable</p>
        <p className="col-span-1 font-semibold">Bill</p>
      </div>

      {fermentables.map((el, i) => (
        <div key={i} className="grid grid-cols-4 py-2">
          <p className="col-span-1">{el.quantity}</p>
          <p className="col-span-2">{el.name.split('-')[0]}</p>
          <p className="col-span-1">{(el.quantity / bill * 100).toFixed(1)}%</p>
        </div>
      ))}

      <p className="font-semibold">{bill} kg</p>
    </div>
  );
};
