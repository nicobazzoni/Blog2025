// schemaTypes/customImage.js
export default {
    name: 'customImage',
    title: 'Custom Image',
    type: 'image',
    options: { hotspot: true },
    fields: [
      {
        name: 'caption',
        title: 'Caption',
        type: 'string',
        options: { isHighlighted: true },
      },
      {
        name: 'alt',
        title: 'Alt Text',
        type: 'string',
        options: { isHighlighted: true },
        validation: (Rule) => Rule.error('You must provide alt text for accessibility.').required(),
      },
    ],
  };