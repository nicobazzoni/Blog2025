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

app.options('*', cors()); // Handle preflight requests

app.use(bodyParser.json());

// Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-01-01',
});

// Zoho Mail configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

// Subscription endpoint
app.post('/backend/server', async (req, res) => {
  const { name, email } = req.body;

  try {
    console.log('Received subscription request:', { name, email });

    const sanityResult = await client.create({
      _type: 'subscriber',
      name,
      email,
    });

    console.log('Sanity save successful:', sanityResult);

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
    console.log('Email sent successfully:', emailResult);

    res.status(200).send('Subscription successful!');
  } catch (error) {
    console.error('Error in subscription process:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Unsubscribe endpoint
app.post('/api/unsubscribe', async (req, res) => {
  const { email } = req.body;

  try {
    console.log(`Unsubscribe request received for: ${email}`);

    const query = `*[_type == "subscriber" && email == $email][0]`;
    const subscriber = await client.fetch(query, { email });

    if (!subscriber) {
      return res.status(404).send('Subscriber not found.');
    }

    await client.delete(subscriber._id);
    console.log(`Unsubscribed: ${email}`);
    res.status(200).send('Successfully unsubscribed.');
  } catch (error) {
    console.error('Error during unsubscribe:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});