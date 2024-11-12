import React from 'react';

function Contact() {
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Me</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <img
          src="public/nico-photo.jpg" // Replace with the actual URL of your photo
          alt="Your Name"
          className="w-40 h-40 rounded-full object-cover shadow-lg"
        />
        <p className="text-lg text-gray-700 leading-relaxed">
          my cell phone is 917 200 2389
          <br /><br />
         my email is nicobazzoni@gmail.com 
        </p>
      </div>
    </div>
  );
}

export default Contact;