import { VercelRequest, VercelResponse } from '@vercel/node';
import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', async (req: VercelRequest, res: VercelResponse) => {
  res.status(200).json({ status: 'ok' });
});

// Add your other API routes here
// Example:
app.get('/api/test', async (req: VercelRequest, res: VercelResponse) => {
  res.status(200).json({ message: 'API is working!' });
});

export default app;
