import React from "react";
import { WaterProfile } from "../../redux/reducers/types";

type Props = {
  water: WaterProfile;
};

export const WaterDetail: React.FC<Props> = ({ water }) => {

  const { bicarbonate, calcium, chlorine, magnesium, sodium, sulfate } = water;

  return (
    <div className="mb-6">
      <div className="py-4 font-semibold text-2xl text-brown1">
        <p>Water Chemistry</p>
      </div>

      <div className="grid grid-cols-6 justify-items-center py-4 bg-blue-200">
        <p className="col-span-1 font-semibold">Ca+2</p>
        <p className="col-span-1 font-semibold">Mg+2</p>
        <p className="col-span-1 font-semibold">Na+</p>
        <p className="col-span-1 font-semibold">Cl-</p>
        <p className="col-span-1 font-semibold">SO4-2</p>
        <p className="col-span-1 font-semibold">HCO3-</p>
      </div>

      <div className="grid grid-cols-6 justify-items-center py-4 bg-blue-100">
        <p className="col-span-1">{calcium}</p>
        <p className="col-span-1">{magnesium}</p>
        <p className="col-span-1">{sodium}</p>
        <p className="col-span-1">{chlorine}</p>
        <p className="col-span-1">{sulfate}</p>
        <p className="col-span-1">{bicarbonate}</p>
      </div>
    </div>
  );
};
