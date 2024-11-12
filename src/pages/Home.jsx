// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import sanityClient, { urlFor } from '/blog2025/sanityClient.js';
import EyeModel from '/Users/nico/blog2025/src/components/Eye.jsx';
import Human from '/Users/nico/blog2025/src/components/Human.jsx'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    sanityClient
      .fetch('*[_type == "post"]{title, slug, mainImage}')
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div className="container mx-auto p-4">
     
      
      {/* Blog Posts */}
      <h1 className="text-1xl font-italic mb-1 text-gray-800">reads</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      
      
     
        {posts.map((post) => (
          <Link to={`/post/${post.slug.current}`} key={post.slug.current} className="block rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {post.mainImage && (
              <img src={urlFor(post.mainImage).width(400).url()} alt={post.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
            </div>
          </Link>
        ))}
      </div>

      

      <h1 className="text-1xl mt-2 font-italic text-gray-800 mb-1">impressions</h1>
     
      <div className="mb-8">

      <div>
     
        <EyeModel />

     
       
        
   
    </div>

   
      </div>
      
    </div>
  );
}

export default Home;