import React, { useEffect, useState } from 'react';
import sanityClient from '../../blog2025/sanityClient.js'
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const SongList = () => {
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    const query = `*[_type == "music"]{
      title,
      url,
      image
    }`;

    try {
      const songs = await sanityClient.fetch(query);
      return songs;
    } catch (error) {
      console.error("Failed to fetch songs:", error);
      return [];
    }
  };

  useEffect(() => {
    async function getSongs() {
      const fetchedSongs = await fetchSongs();
      setSongs(fetchedSongs);
    }
    getSongs();
  }, []);

  return (
    <div className=' p-2 bg-black-200'>
      <h2 className='font-mono mb-1'>Latest Nicoroc Music</h2>
      <ul>
        {songs.map((song, index) => (
          <li key={index} className="flex items-center mb-4  ">
            {song.image && (
              <img
                src={urlFor(song.image).width(100).url()}
                alt={song.title}
                className="w-24 h-24 object-cover mr-4 border rounded-md  "
              />
            )}
            <div>
              <h3>{song.title}</h3>
              <audio className='-z-2 ' controls src={song.url}>
                Your browser does not support the audio tag.
              </audio>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;