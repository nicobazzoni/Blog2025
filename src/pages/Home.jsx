import { Link } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import sanityClient, { urlFor } from '/blog2025/sanityClient.js';
import EyeModel from '../components/Eye';
import DrawingSlideshow from '../components/DrawingSlideShow';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import VideoBackground from '../components/VideoBackground';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the time as needed
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    sanityClient
      .fetch('*[_type == "post"]{title, slug, mainImage} | order(_createdAt desc)[0...3]') // Fetch limited posts
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  if (loading) {
    // Render loading screen while loading
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-solid border-opacity-80"></div>
        <p className="mt-4 text-gray-500 text-sm">Loading, please wait...</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'hidden', width: '100vw' }} className="container mx-auto p-4">
      <VideoBackground />

      {/* Blog Teaser Section */}
      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Blog Posts</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              to={`/post/${post.slug.current}`}
              key={post.slug.current}
              className="block rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage).width(400).url()}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
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

      {/* Drawing Slideshow */}
      <div className="my-8">
        <h2 className="text-1xl font-semibold text-gray-800 mb-4">My Drawings</h2>
        <DrawingSlideshow />
      </div>

      <h1 className="text-1xl mt-2 font-italic text-gray-800 mb-1">Interact</h1>
      <div>
        <EyeModel />
      </div>
    </div>
  );
}

export default Home;