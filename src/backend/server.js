import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Allowed Origins
const allowedOrigins = ['https://nicosblog.com', 'https://www.nicosblog.com'];

app.use((req, res, next) => {
    console.log('--- CORS Debugging ---');
    console.log('Request Origin:', req.headers.origin);
    console.log('Request URL:', req.url);
    console.log('Request Method:', req.method);
    console.log('Headers:', req.headers);

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // Preflight response
    }
    next();
});

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS Error: Origin ${origin} not allowed`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('--- New Request ---');
    console.log('URL:', req.url);
    console.log('Method:', req.method);
    console.log('Origin:', req.headers.origin || 'Direct call (no origin)');
    next();
});

app.use((req, res, next) => {
    const preferredDomain = 'www.nicosblog.com';
    if (req.hostname !== preferredDomain && req.method !== 'OPTIONS') {
        return res.redirect(308, `https://${preferredDomain}${req.originalUrl}`);
    }
    next();
});

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2023-01-01',
});

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
    },
});

app.post('/backend/server', async (req, res) => {
    const { name, email } = req.body;
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    try {
        const sanityResult = await client.create({ _type: 'subscriber', name, email });
        const mailOptions = {
            from: `"Nico's Blog" <${process.env.ZOHO_EMAIL}>`,
            to: email,
            subject: 'Welcome!',
            html: `<p>Hi ${name}, thank you for subscribing!</p>`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Subscription successful!' });
    } catch (error) {
        console.error('Error in /backend/server:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err.message);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));