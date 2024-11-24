import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export default async function handler(req, res) {
    if (req.method === 'POST' || req.method === 'GET') {
        const email = req.method === 'POST' ? req.body.email : req.query.email;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        try {
            // Example: Remove subscriber from Sanity
            const result = await client.delete({
                query: `*[_type == "subscriber" && email == $email][0]._id`,
                params: { email },
            });

            if (result) {
                res.status(200).json({ message: 'Unsubscribed successfully!' });
            } else {
                res.status(404).json({ error: 'Subscriber not found' });
            }
        } catch (error) {
            console.error('Sanity error:', error);
            res.status(500).json({ error: 'Failed to unsubscribe' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}