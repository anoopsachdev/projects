import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1
      className='font-extrabold text-[50px] mt-16 text-center leading-tight'>
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#f56551] to-orange-400'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
      </h1>
      <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries to your interests and budget.</p>

      <Link to = {'create-trip'}>
      <Button className="bg-black text-white hover:bg-gray-800">Get Started</Button>
      </Link>
    </div>
  )
}

export default Hero