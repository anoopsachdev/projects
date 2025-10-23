import React,{createContext, useState, useContext} from 'react';

function Navbar() {

  return (
    <nav className='bg-gray-800 p-4 fixed w-full top-0 z-50'>
        <div className='container mx-auto flex justify-between item-center'>
            <h1 className='text-white text-2xl ubuntu-bold'> NerdCave</h1>
            <div className='space-x-4'>
                <a href="#home" className='text-white hover:text-gray-400'>
                    Home
                </a>
                <a href="#artists" className="text-white hover:text-gray-400">
                    Artists
                </a>
                <a href="#about" className="text-white hover:text-gray-400">
                    About
                </a>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;