import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="/logo.svg" alt="TripMate logo" className='h-12 w-auto'/>
      <div>
        <Button className="bg-black text-white hover:bg-gray-800">Sign in</Button>
      </div>
    </div>
  )
}

export default Header