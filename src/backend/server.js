import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();

// Allow CORS for specific origins dynamically
const allowedOrigins = ['https://nicosblog.com', 'https://www.nicosblog.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and credentials
  methods: ['GET', 'POST', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

// Handle preflight requests explicitly
app.options('*', cors());

// Configure Sanity Client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID, // Your Sanity project ID
  dataset: process.env.SANITY_DATASET || 'production', // Your Sanity dataset
  useCdn: false, // Set to false for real-time data
  token: process.env.SANITY_API_TOKEN, // API token with write permissions
  apiVersion: '2023-01-01', // Use a specific version (update as needed)
});

// Configure Zoho Mail
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.ZOHO_EMAIL, // Zoho email address
    pass: process.env.ZOHO_PASSWORD, // Zoho email password
  },
});

// Subscription Endpoint
app.post('/backend/server', async (req, res) => {
  const { name, email } = req.body;

  try {
    console.log('Received subscription request:', { name, email });

    // Save subscriber to Sanity
    const sanityResult = await client.create({
      _type: 'subscriber',
      name,
      email,
    });
    console.log('Sanity save successful:', sanityResult);

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
    console.log('Email sent successfully:', emailResult);

    res.status(200).send('Subscription successful!');
  } catch (error) {
    console.error('Error in subscription process:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/unsubscribe', async (req, res) => {
  const { email } = req.body; // Extract the email from the request body

  try {
    console.log(`Unsubscribe request received for: ${email}`);

    // Find the subscriber by email
    const query = `*[_type == "subscriber" && email == $email][0]`;
    const subscriber = await client.fetch(query, { email });

    if (!subscriber) {
      return res.status(404).send('Subscriber not found.');
    }

    // Delete the subscriber document
    await client.delete(subscriber._id);
    console.log(`Unsubscribed: ${email}`);
    res.status(200).send('Successfully unsubscribed.');
  } catch (error) {
    console.error('Error during unsubscribe:', error.message);
    res.status(500).send('An error occurred while processing your request.');
  }
});

// Start the Server
const PORT = process.env.PORT || 5001; // Change to 5001 or another available port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});