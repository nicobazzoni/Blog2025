import sanityClient from '@sanity/client';

const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

export default async function handler(req, res) {
    // Set CORS headers for unsubscribe
    res.setHeader('Access-Control-Allow-Origin', 'https://www.nicosblog.com');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        // Handle preflight request
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        try {
            // Fetch and delete the subscriber in Sanity
            const query = `*[_type == "subscriber" && email == $email][0]._id`;
            const params = { email };
            const documentId = await client.fetch(query, params);

            if (documentId) {
                await client.delete(documentId);
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