import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize the Sanity client using `createClient`
const client = createClient({
  projectId: '7n5qn1hp',     // Replace with your project ID
  dataset: 'production',      // Replace with your dataset name
  apiVersion: '2023-11-11',   // Use the latest date or your preferred version
  useCdn: true,               // `true` for faster CDN caching
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);

// Function to generate image URLs
export function urlFor(source) {
  return builder.image(source);
}

export default client;