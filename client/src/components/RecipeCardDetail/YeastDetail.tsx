import React from "react";
import { Yeast } from "../../redux/reducers/types";

type Props = {
  yeast: Yeast;
};

export const YeastDetail: React.FC<Props> = ({ yeast }) => {
  return (
    <div>
      <div className="py-4 font-semibold text-2xl text-brown1">
        <p>Yeast</p>
      </div>
      <div className="w-2/3">
        <div className="grid grid-cols-3 pb-4 bg-blue-50">
          <p className="col-span-1">Name</p>
          <p className="col-span-1">Quantity (g)</p>
          <p className="col-span-1">Attenuation (%)</p>
        </div>
        <div className="grid grid-cols-3 ">
          <p className="col-span-1 font-semibold">{yeast.name}</p>
          <p className="col-span-1 font-semibold">{yeast.quantity}</p>
          <p className="col-span-1 font-semibold">{yeast.attenuation}</p>
        </div>
      </div>
    </div>
  );
};
