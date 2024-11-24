import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sanityClient, { urlFor } from '/blog2025/sanityClient.js';
import VideoBackground from '../components/VideoBackground';
import DrawingSlideshow from '../components/DrawingSlideShow';
import EyeModel from '../components/Eye';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    sanityClient
      .fetch('*[_type == "post"]{title, slug, mainImage} | order(_createdAt desc)[0...3]')
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div
      style={{ overflowX: 'hidden', width: '100vw' }}
      className="relative h-full w-full"
    >
      {/* Video Background */}
      <VideoBackground />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto p-4">
        <button>
        <Link to='/subscribe'
        className="block rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">

        </Link>
        </button>
        <div className="my-8">
          <h2 className="text-2xl font-bold text-white mb-4">Latest Blog Posts</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                to={`/post/${post.slug.current}`}
                key={post.slug.current}
                className="block rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {post.mainImage && (
                  <img
                    src={urlFor(post.mainImage).width(400).height(300).url()}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 bg-white">
                  <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/blog"
              className="text-blue-500 hover:underline text-lg font-medium"
            >
              See All Blog Posts →
            </Link>
          </div>
        </div>

        <div className="my-8">
          <h2 className="text-xl font-semibold text-white mb-4">My Drawings</h2>
          <DrawingSlideshow />
        </div>

        {/* <h1 className="text-xl mt-2 font-italic text-white mb-1">Interact</h1>
        <div style={{ height: "50vh", width: "100%" }}>
          <EyeModel className='h-1/2' />
        </div>
        */}
      </div>
    </div>
  );
}

export default Home;