import React from 'react'
import {Parameters} from '../../redux/reducers/types'

type Props = {
    parameters: Parameters
    style: string
}

export const ParametersDetail: React.FC<Props> = ({parameters, style}) => {

    const {
        boil_time,
        batch_size,
        pre_boil_size,
        pre_boil_gravity,
        efficiency,
      }: {
        boil_time: number;
        batch_size: number;
        pre_boil_size: number;
        pre_boil_gravity: number;
        efficiency: number;
        mash_ph: number;
      } = parameters;

    return(
        <div className="grid grid-cols-6 gap-2 p-4 border border-mainC rounded bg-bgMain">
          <div className="col-span-6 border-b border-mainC2">
            <p className="text-gray-700 font-semibold">Beer Stats</p>
          </div>

          <div className="col-span-2 text-gray-800">
            <p>Style:</p>
            <p>Boil Time:</p>
            <p>Batch Size:</p>
            <p>Pre Boil Size:</p>
            <p>Pre Boil Gravity:</p>
            <p>Efficiency:</p>
          </div>

          <div className="col-span-4 ">
            <p className="font-semibold">{style}</p>
            <p className="font-semibold">{boil_time} min.</p>
            <p className="font-semibold">{batch_size} liters</p>
            <p className="font-semibold">{pre_boil_size} liters</p>
            <p className="font-semibold">{pre_boil_gravity}</p>
            <p className="font-semibold">{efficiency}%</p>
          </div>
        </div>
    )
}