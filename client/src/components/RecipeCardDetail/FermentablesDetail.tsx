import React from "react";
import { Fermentables } from "../../redux/reducers/types";

type Props = {
  fermentables: Fermentables[];
};

export const FermentablesDetail: React.FC<Props> = ({ fermentables }) => {

  return (
    <div>
      <div className="pt-4 font-semibold text-xl">
        <p>Fermentables</p>
      </div>

      <div className="grid grid-cols-3 py-4">
        <p className="col-span-1">Quantity</p>
        <p className="col-span-2">Fermentable</p>
      </div>

      {fermentables.map((el, i) => (
        <div key={i} className="grid grid-cols-3 py-2">
          <p className="col-span-1">{el.quantity}</p>
          <p className="col-span-2">{el.name}</p>
        </div>
      ))}
    </div>
  );
};
