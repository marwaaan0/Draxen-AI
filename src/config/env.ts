import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define environment variable schema
const envSchema = z.object({
  // Server
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Security
  JWT_SECRET: z.string().optional(),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  
  // Feature Flags
  ENABLE_LOGGING: z.string().transform(val => val === 'true').default('true'),
  ENABLE_RATE_LIMITING: z.string().transform(val => val === 'true').default('true'),
});

// Validate and transform environment variables
const env = envSchema.parse(process.env);

// Export typed environment variables
export const config = {
  port: parseInt(env.PORT),
  nodeEnv: env.NODE_ENV,
  isProduction: env.NODE_ENV === 'production',
  isDevelopment: env.NODE_ENV === 'development',
  isTest: env.NODE_ENV === 'test',
  security: {
    jwtSecret: env.JWT_SECRET,
    corsOrigin: env.CORS_ORIGIN,
  },
  features: {
    enableLogging: env.ENABLE_LOGGING,
    enableRateLimiting: env.ENABLE_RATE_LIMITING,
  },
} as const;
