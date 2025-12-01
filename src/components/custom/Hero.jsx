import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    // Added min-h-screen to ensure it covers the full height
    // Added flex/justify-center to center the text vertically in that full height
    <div className='relative overflow-hidden min-h-screen flex items-center justify-center'>
      
      <div className="absolute inset-0 -z-10">
        <img 
          src="/HeroBG.jpeg" 
          alt="background" 
          // Removed 'opacity-20' so the image is clear.
          // Added 'brightness-50' to darken the image slightly so white text pops (optional)
          className="w-full h-full object-cover brightness-50" 
        />
      </div>

      <div className='flex flex-col items-center mx-5 md:mx-56 gap-9 relative z-10'>
        <h1 className='font-extrabold text-[50px] mt-16 text-center leading-tight text-white'>
           {/* Added text-white to base text since background is now an image */}
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#f56551] to-orange-400'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
        </h1>
        <p className='text-xl text-gray-200 text-center'> {/* Changed to gray-200 for better visibility on dark image */}
          Your personal trip planner and travel curator, creating custom itineraries to your interests and budget.
        </p>

        <Link to={'/create-trip'}>
          <Button className="bg-[#f56551] text-white hover:bg-orange-600">Get Started</Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero