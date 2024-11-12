import { useState, useEffect } from 'react';
import sanityClient from '/blog2025/sanityClient.js';

function VideoLinks() {
  const [videoLinks, setVideoLinks] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "videoLink"]{title, description, videoPath, "thumbnailUrl": thumbnail.asset->url, appUrl}`)
      .then((data) => setVideoLinks(data))
      .catch(console.error);
  }, []);

  return (
    <div className="container mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
      {videoLinks.map((link) => (
        <div key={link.title} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
          <a href={link.appUrl} target="_blank" rel="noopener noreferrer">
            <img src={link.thumbnailUrl} alt={link.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{link.title}</h2>
              <p className="text-gray-600 mb-4">{link.description}</p>
            </div>
          </a>
          <video controls className="w-full mt-4">
            <source src={link.videoPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}

export default VideoLinks;