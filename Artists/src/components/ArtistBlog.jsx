
import React, {useState} from 'react';
function ArtistBlog({ artist }) {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <div id={artist.id} className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 max-w-4xl">
      <h2 className="text-3xl font-bold text-white mb-4">{artist.artist}</h2>
      <img
        className="w-full h-96 object-cover rounded-lg mb-4"
        src={artist.img}
        alt={artist.artist}
      />
      <h3 className="text-xl font-semibold text-white mb-2">{artist.tour || "TBA"}</h3>
      <p className="text-gray-300 mb-2">{artist.description?.paraOne}</p>
      <h3 className='font-bold'>Get to know more about {artist.artist}!</h3>

      {showDetails &&(
        <div>   
          <div className='text-gray-300 '>
            {artist.description?.paraTwo}
            
          </div>
          <div className='text-gray-300'>
            {artist.description?.paraThree}
          </div>
        </div>
      )}
      <button
      onClick={() => setShowDetails(!showDetails)}
      className='mb-4  text-white rounded-lg cursor-pointer  hover:text-gray-300'>
        {showDetails?'show less':'show more'}
      </button>
      <div>
      <a
        href={artist.insta?.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
      >
        {artist.insta?.handle || "No Instagram"}
      </a>
      </div>
    </div>
  );
}

export default ArtistBlog;