import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export const Footer = () => {
  return (
    <footer className='hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2'>
        <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
          <Button size='lg' variant="ghost" className='w-full'>
            <Image 
              src='/France.svg' 
              alt='french' 
              height={32} 
              width={40}
              className='mr-4 rounded-md'
            />
            French
          </Button>
          <Button size='lg' variant="ghost" className='w-full'>
            <Image 
              src='/Palestinian.svg' 
              alt='Palestinian' 
              height={32} 
              width={40}
              className='mr-4 rounded-md'
            />
            Arabic
          </Button>
          <Button size='lg' variant="ghost" className='w-full'>
            <Image 
              src='/Spain.svg' 
              alt='spain' 
              height={32} 
              width={40}
              className='mr-4 rounded-md'
            />
            Spanish
          </Button>
          <Button size='lg' variant="ghost" className='w-full'>
            <Image 
              src='/United-States.svg' 
              alt='english' 
              height={32} 
              width={40}
              className='mr-4 rounded-md'
            />
            English
          </Button>
          <Button size='lg' variant="ghost" className='w-full'>
            <Image 
              src='/Portugal.svg' 
              alt='Portuguese' 
              height={36} 
              width={40}
              className='mr-4 rounded-md'
            />
            Portuguese
          </Button>
        </div>
    </footer>
  )
}
