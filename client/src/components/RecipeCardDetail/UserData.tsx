import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers/RootReducer'

type Props = {
    username: string
}

export const UserData: React.FC<Props> = ({username}) => {
    

    return(
        <div className='py-4 border-b border-gray-700'>
            <p className='text-xl font-semibold text-orange-500 text-center'>{username}</p>
        </div>
    )
}