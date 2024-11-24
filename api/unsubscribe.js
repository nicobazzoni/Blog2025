export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.nicosblog.com'); // Allow your domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        // Preflight request
        return res.status(200).end();
    }

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
                return res.status(200).json({ message: 'Unsubscribed successfully!' });
            } else {
                return res.status(404).json({ error: 'Subscriber not found' });
            }
        } catch (error) {
            console.error('Sanity error:', error);
            return res.status(500).json({ error: 'Failed to unsubscribe' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}