import sanityClient from '@sanity/client';

const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email } = req.body;

        try {
            const result = await client.create({
                _type: 'subscriber',
                name,
                email
            });
            res.status(200).json({ message: 'Subscription successful!', result });
        } catch (error) {
            console.error('Sanity error:', error);
            res.status(500).json({ error: 'Failed to store subscription' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}