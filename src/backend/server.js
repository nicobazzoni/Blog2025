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

// CORS Setup
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON
app.use(bodyParser.json());

// Middleware to log all requests
app.use((req, res, next) => {
  console.log('--- New Request ---');
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  console.log('Origin:', req.headers.origin || 'Direct call (no origin)');
  next();
});

// Middleware for Redirects
app.use((req, res, next) => {
  const preferredDomain = 'www.nicosblog.com';
  if (req.hostname !== preferredDomain) {
    if (req.method === 'OPTIONS') return next(); // Skip redirects for OPTIONS
    return res.redirect(308, `https://${preferredDomain}${req.originalUrl}`);
  }
  next();
});

// Configure Sanity
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-01-01',
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

// Subscription Endpoint
app.post('/backend/server', async (req, res) => {
  const { name, email } = req.body;
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));