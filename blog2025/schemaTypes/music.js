// schemas/music.js

export default {
    name: 'music',
    title: 'Music',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The title of the song',
        validation: Rule => Rule.required(),
      },
      {
        name: 'url',
        title: 'URL',
        type: 'url',
        description: 'URL to the song in Google Cloud Storage',
        validation: Rule => Rule.uri({
          scheme: ['https'],
        }),
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        description: 'Cover image for the song',
        options: {
          hotspot: true, // Allows you to select the main focus point in the image
        },
      },
    ],
  };