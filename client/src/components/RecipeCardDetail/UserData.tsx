import React from 'react'

type Props = {
    username: string
}

export const UserData: React.FC<Props> = ({username}) => {
    

    return(
        <div className='py-4 border-b border-gray-700'>
            <p className='text-xl font-semibold text-blueDark text-center'>{username}</p>
        </div>
    )
}