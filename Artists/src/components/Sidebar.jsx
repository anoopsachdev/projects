import React from 'react';

function Sidebar() {
  return (
    <div className="fixed left-0 top-16 h-screen w-52 bg-gray-800 p-4 overflow-y-auto">
      <h2 className="text-xl  text-white mb-4 ">Table of Contents</h2>
      <ul className="space-y-2">
        <li>
          <a href="#billie" className="text-gray-300 hover:text-white">
            Billie Eilish
          </a>
          <ul className="ml-4 mt-1">
            <li>
              <a href="#billie-tour" className="text-gray-400 hover:text-white">
                Tour Details
              </a>
            </li>
            <li>
              <a href="#billie-album" className="text-gray-400 hover:text-white">
                Album Info
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#theweeknd" className="text-gray-300 hover:text-white">
            The Weeknd
          </a>
          <ul className="ml-4 mt-1">
            <li>
              <a href="#theweeknd-tour" className="text-gray-400 hover:text-white">
                Tour Dates
              </a>
            </li>
            <li>
              <a href="#theweeknd-collabs" className="text-gray-400 hover:text-white">
                Collaborations
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#cigsaftersex" className="text-gray-300 hover:text-white">
            Cigarettes After Sex
          </a>
          <ul className="ml-4 mt-1">
            <li>
              <a href="#cas-tour" className="text-gray-400 hover:text-white">
                Tour Highlights
              </a>
            </li>
            <li>
              <a href="#cas-music" className="text-gray-400 hover:text-white">
                Music Style
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#diljit" className="text-gray-300 hover:text-white">
            Diljit Dosanjh
          </a>
          <ul className="ml-4 mt-1">
            <li>
              <a href="#diljit-tour" className="text-gray-400 hover:text-white">
                Tour Schedule
              </a>
            </li>
            <li>
              <a href="#diljit-achievements" className="text-gray-400 hover:text-white">
                Achievements
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#shawn" className="text-gray-300 hover:text-white">
            Shawn Mendes
          </a>
          <ul className="ml-4 mt-1">
            <li>
              <a href="#shawn-tour" className="text-gray-400 hover:text-white">
                Tour Updates
              </a>
            </li>
            <li>
              <a href="#shawn-music" className="text-gray-400 hover:text-white">
                Latest Music
              </a>
            </li>
          </ul>
        </li>
        {/* finneas */}
        <li>
          <a href="#finneas" className="text-gray-300 hover:text-white">
            Finneas
          </a>
          <ul className="ml-4 mt-1">
            <li>
              <a href="#finneas-tour" className="text-gray-400 hover:text-white">
                Tour Updates
              </a>
            </li>
            <li>
              <a href="#finneas-music" className="text-gray-400 hover:text-white">
                Latest Music
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;