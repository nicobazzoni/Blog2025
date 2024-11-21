import React from 'react';

function About() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="https://storage.googleapis.com/new-music/2144-155246341_small.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About Me</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6">
          Hi, I'm nico! I'm passionate about philosophy, music and coding.
          This is where I share my journey, thoughts, and creativity with the world.
        </p>
        <a
          href="/contact"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}

export default About