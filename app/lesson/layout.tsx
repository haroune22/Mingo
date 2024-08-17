import React from 'react'

const LeessonLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex flex-col h-full'>
        <div className="flex flex-col h-full w-full">
            {children}
        </div>
    </div>
  )
}

export default LeessonLayout