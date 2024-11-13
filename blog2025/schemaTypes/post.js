// schemaTypes/post.js
import customImage from './customImage';

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title', // Automatically generate from the title
          maxLength: 96,
          slugify: input => input
            .toLowerCase()
            .replace(/\s+/g, '-')        // Replace spaces with dashes
            .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
            .replace(/\-\-+/g, '-')      // Replace multiple dashes with a single dash
            .trim()
        },
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'customImage' },  // Use the imported customImage here
      ],
    },
  ],
};