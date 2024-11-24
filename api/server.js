import sanityClient from '@sanity/client';
import nodemailer from 'nodemailer';

const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: process.env.ZOHO_EMAIL, // Your Zoho email
        pass: process.env.ZOHO_PASSWORD, // App-specific password or Zoho account password
    },
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        try {
            // Store the subscriber in Sanity
            const result = await client.create({
                _type: 'subscriber',
                name,
                email,
            });

            // Send a confirmation email
            const mailOptions = {
                from: `"Nico's Blog" <${process.env.ZOHO_EMAIL}>`, // Sender address
                to: email, // List of receivers
                subject: 'Thank You for Subscribing!', // Subject line
                html: `
                    <p>Hi ${name},</p>
                    <p>Thank you for subscribing to Nico's Blog!</p>
                    <p>We’re excited to have you with us. Stay tuned for updates and amazing content.</p>
                    <p>Best regards,<br>Nico's Blog Team</p>
                `,
            };

            await transporter.sendMail(mailOptions);

            // Respond with success
            res.status(200).json({ message: 'Subscription successful!', result });
        } catch (error) {
            console.error('Error during subscription:', error);
            res.status(500).json({ error: 'Failed to store subscription or send email' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}