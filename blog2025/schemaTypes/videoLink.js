// schemaTypes/videoLink.js
export default {
    name: 'videoLink',
    title: 'Video Link',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The title of the video or app being featured.',
        validation: (Rule) => Rule.required().min(3).max(50),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'A brief description of the app or feature.',
        validation: (Rule) => Rule.max(150),
      },
      {
        name: 'videoPath',
        title: 'Video Path',
        type: 'string',
        description: 'Path to the video in the public folder (e.g., "/demo-video.mp4")',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'thumbnail',
        title: 'Thumbnail',
        type: 'image',
        description: 'Thumbnail image to display as the preview icon.',
        options: { hotspot: true },
      },
      {
        name: 'appUrl',
        title: 'App URL',
        type: 'url',
        description: 'URL that links to the app or more information.',
        validation: (Rule) => Rule.uri({
          scheme: ['http', 'https'],
        }),
      },
    ],
  };