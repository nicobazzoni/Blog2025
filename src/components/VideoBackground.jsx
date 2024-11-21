import React from 'react';

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="https://storage.googleapis.com/new-music/119527-718118183_small.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-40">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Nico Augusto Bazzoni</h1>
        <p className="text-lg tracking-widest md:text-xl max-w-xl mb-6">
          Known unkowns.
        </p>
        {/* <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition">
          Learn More
        </button> */}
      </div>
    </div>
  );
}