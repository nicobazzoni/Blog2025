import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();

// Allow specific origins
const allowedOrigins = ['https://nicosblog.com', 'https://www.nicosblog.com'];

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

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204);
});

// Middleware to log all requests
app.use((req, res, next) => {
  console.log('--- New Request ---');
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  console.log('Origin:', req.headers.origin || 'Direct call (no origin)');
  console.log('Headers:', req.headers);
  next();
});

// Parse incoming JSON payloads
app.use(bodyParser.json());

// Configure Sanity Client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID, // Your Sanity project ID
  dataset: process.env.SANITY_DATASET || 'production', // Your Sanity dataset
  useCdn: false, // Set to false for real-time data
  token: process.env.SANITY_API_TOKEN, // API token with write permissions
  apiVersion: '2023-01-01',
});

// Configure Zoho Mail
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL, // Zoho email address
    pass: process.env.ZOHO_PASSWORD, // Zoho email password
  },
});

// Subscription Endpoint
app.post('/backend/server', async (req, res) => {
  const { name, email } = req.body;

  console.log('--- Subscription Request Received ---');
  console.log('Name:', name);
  console.log('Email:', email);

  try {
    // Save subscriber to Sanity
    const sanityResult = await client.create({
      _type: 'subscriber',
      name,
      email,
    });

    console.log('Sanity Save Result:', sanityResult);

    // Send Thank You Email
    const mailOptions = {
      from: `"Nico's Blog" <${process.env.ZOHO_EMAIL}>`,
      to: email,
      subject: 'Welcome to Nico’s Blog!',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for subscribing to my blog!</p>
        <p>If you'd like to unsubscribe, click <a href="https://nicosblog.com/unsubscribe?email=${encodeURIComponent(email)}">here</a>.</p>
      `,
    };

    const emailResult = await transporter.sendMail(mailOptions);
    console.log('Email Sent Result:', emailResult);

    res.status(200).send('Subscription successful!');
  } catch (error) {
    console.error('Error in Subscription Process:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Unsubscribe Endpoint
app.post('/api/unsubscribe', async (req, res) => {
  const { email } = req.body;

  console.log('--- Unsubscribe Request Received ---');
  console.log('Email:', email);

  try {
    // Find the subscriber by email
    const query = `*[_type == "subscriber" && email == $email][0]`;
    const subscriber = await client.fetch(query, { email });

    if (!subscriber) {
      console.error('Unsubscribe Error: Subscriber not found');
      return res.status(404).send('Subscriber not found.');
    }

    // Delete the subscriber document
    await client.delete(subscriber._id);
    console.log(`Subscriber with email ${email} unsubscribed successfully.`);

    res.status(200).send('Successfully unsubscribed.');
  } catch (error) {
    console.error('Error in Unsubscribe Process:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});