import React from "react";
import {Characteristics} from '../../redux/reducers/types'

type Props = {
characteristics: Characteristics;
mash_ph: number;
}

export const CharacteristicsDetail: React.FC<Props> = ({characteristics, mash_ph}) => {
    const {
        alcohol_by_volume,
        final_gravity,
        ibu,
        original_gravity,
        srm,
      }: {
        alcohol_by_volume: number;
        final_gravity: number;
        ibu: number;
        original_gravity: number;
        srm: number;
      } = characteristics;

  return (
    <div className="flex justify-around gap-12 py-8">
      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold ">Original Gravity:</p>
        <p className="text-2xl text-orange-700">{original_gravity}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold ">Final Gravity:</p>
        <p className="text-2xl text-orange-700">{final_gravity}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold ">ABV:</p>
        <p className="text-2xl text-orange-700">{alcohol_by_volume}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold ">IBU:</p>
        <p className="text-2xl text-orange-700">{ibu}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold ">SRM:</p>
        <p className="text-2xl text-orange-700">{srm}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold ">Mash Ph:</p>
        <p className="text-2xl text-orange-700">{mash_ph}</p>
      </div>
    </div>
  );
};
