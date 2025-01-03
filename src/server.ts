import express from 'express';
import cors from 'cors';
import { config } from './config/env';

const app = express();

// Configure CORS
app.use(cors({
  origin: config.security.corsOrigin,
  credentials: true,
}));

app.use(express.json());

// Basic health check endpoint
app.get('/', (_req, res) => {
  res.json({ 
    status: 'ok',
    environment: config.nodeEnv,
    features: config.features
  });
});

app.listen(config.port, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});
