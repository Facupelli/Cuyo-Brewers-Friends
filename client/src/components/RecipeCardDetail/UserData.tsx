import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers/RootReducer'

export const UserData: React.FC = () => {
    const userData = useSelector((state:RootState) => state.storeUser.userData)

    return(
        <div className='py-4 border-b border-gray-700'>
            <p className='text-xl font-semibold text-orange-500 text-center'>{userData.username}</p>
        </div>
    )
}