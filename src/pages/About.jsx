// src/pages/About.jsx
import React from 'react';

function About() {
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About Me</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <img
          src="/nico-photo.jpg" // Replace with the actual URL of your photo
          alt="Your Name"
          className="w-40 h-40 rounded-full object-cover shadow-lg"
        />
        <p className="text-lg text-gray-700 leading-relaxed">
          Hi, I'm Nicholas Bazzoni. I'm passionate about music, coding and philosophy. 
          Through this blog, I share insights, stories, and experiences and ideas in general to stay inspired. 
          <br /><br />
          Thank you for visiting my blog! I hope you find something valuable here.
        </p>
      </div>
    </div>
  );
}

export default About;