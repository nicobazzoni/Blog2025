import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import sanityClient, { urlFor } from '/blog2025/sanityClient.js';
import { PortableText } from '@portabletext/react';

// Define custom components for Portable Text rendering
const components = {
  types: {
    customImage: ({ value }) => {
      return (
        <figure>
          <img src={urlFor(value).width(800).url()} alt={value.alt || 'Image'} />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
};

function BlogPost() {
  const { slug } = useParams(); // Get the slug from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })
      .then((data) => setPost(data))
      .catch(console.error);
  }, [slug]);

  if (!post) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <article className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
      {post.mainImage && (
        <img
          src={urlFor(post.mainImage).width(800).url()}
          alt={post.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
      )}
      <div className="prose lg:prose-xl">
        {post.body ? (
          <PortableText value={post.body} components={components} />
        ) : (
          <p>No content available</p>
        )}
      </div>
    </article>
  );
}

export default BlogPost;