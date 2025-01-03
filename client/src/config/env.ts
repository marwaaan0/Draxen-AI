/// <reference types="vite/client" />

const getEnvVar = (key: keyof ImportMetaEnv, fallback?: string): string => {
  const value = import.meta.env[key] || fallback
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`)
  }
  return value
}

export const config = {
  apiUrl: getEnvVar('VITE_API_URL', 'http://localhost:3000'),
  features: {
    enableAuth: getEnvVar('VITE_ENABLE_AUTH', 'false') === 'true',
    enableAnalytics: getEnvVar('VITE_ENABLE_ANALYTICS', 'false') === 'true',
  },
  app: {
    name: getEnvVar('VITE_APP_NAME', 'Draxen AI'),
    version: getEnvVar('VITE_APP_VERSION', '1.0.0'),
    environment: getEnvVar('VITE_APP_ENVIRONMENT', 'development') as 'development' | 'production' | 'test',
    isDevelopment: getEnvVar('VITE_APP_ENVIRONMENT', 'development') === 'development',
    isProduction: getEnvVar('VITE_APP_ENVIRONMENT', 'development') === 'production',
    isTest: getEnvVar('VITE_APP_ENVIRONMENT', 'development') === 'test',
  },
} as const;
