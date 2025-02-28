import React from 'react'

const Container = ({children}) => {
  return (
    <div className='thisIsContainer w-full min-h-screen max-w-[1400px] mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-20 '>
        {children}
    </div>
  )
}

export default Container