// fetchDrawings.js


import sanityClient, { urlFor } from '../../blog2025/sanityClient.js';



export const fetchDrawings = async () => {
  const query = `*[_type == "drawing"]{ title, image }`;

  try {
    const drawings = await sanityClient.fetch(query);
    return drawings.map(drawing => ({
      ...drawing,
      imageUrl: urlFor(drawing.image).width(600).url()
    }));
  } catch (error) {
    console.error("Failed to fetch drawings:", error);
    return [];
  }
};