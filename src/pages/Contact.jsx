import React from 'react';

function Contact() {
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
        <source src="https://storage.googleapis.com/new-music/86347-592491771_small.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50 px-6">
        <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img
            src="/nico-photo.jpg" // Replace with your actual photo URL
            alt="Your Name"
            className="w-40 h-40 rounded-full object-cover shadow-lg"
          />
          <p className="text-lg leading-relaxed">
            My cell phone is <a href="tel:9172002389" className="text-blue-400 hover:underline">917-200-2389</a>
            <br /><br />
            My email is <a href="mailto:nicobazzoni@gmail.com" className="text-blue-400 hover:underline">nicobazzoni@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;