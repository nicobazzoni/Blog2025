import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import sanityClient, { urlFor } from '/blog2025/sanityClient.js';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch('*[_type == "post"]{title, slug, mainImage}')
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Blog</h1>
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
    </div>
  );
}

export default Home;