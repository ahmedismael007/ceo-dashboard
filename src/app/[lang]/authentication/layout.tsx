import Image from 'next/image'
import React from 'react'

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 min-h-screen p-20'>
            <div>
                {children}
            </div>
            <div className='relative w-full h-full hidden lg:block'>
                <Image src='/public/images/' alt='Meeting' fill priority className='object-cover' />
            </div>
        </div>
    )
}

export default AuthenticationLayout