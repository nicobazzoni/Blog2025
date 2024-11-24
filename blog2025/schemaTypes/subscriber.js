
export default {
    name: 'subscriber',
    type: 'document',
    title: 'Subscriber',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'email',
        type: 'string',
        title: 'Email',
        validation: (Rule) => Rule.email().required(),
      },
      {
        name: 'subscribedAt',
        type: 'datetime',
        title: 'Subscribed At',
        initialValue: () => new Date().toISOString(),
      },
    ],
  };