// schemaTypes/index.js
import post from './post';
import customImage from './customImage';
import videoLink from './videoLink';  // Import the new schema
import songLink from './songLink';
import drawing from './drawing' // Import the new schema

export const schemaTypes = [post, customImage, videoLink, songLink, drawing, ];
