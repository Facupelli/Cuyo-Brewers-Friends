import React from "react";
import { Yeast } from "../../redux/reducers/types";

type Props = {
    yeast: Yeast
}

export const YeastDetail: React.FC<Props> = ({yeast}) => {
    
  return (
    <div>
      <div className="py-4 font-semibold text-2xl text-brown1">
        <p>Yeast</p>
      </div>
      <div className="flex gap-12">
          <p className="font-semibold">{yeast.name}</p>
          <p className="font-semibold">{yeast.quantity} g</p>
          <p className="font-semibold">{yeast.attenuation} %</p>
      </div>
    </div>
  );
};
