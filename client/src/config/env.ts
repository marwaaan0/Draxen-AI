/// <reference types="vite/client" />

interface Config {
  apiUrl: string;
  appName: string;
  appVersion: string;
  environment: string;
  features: {
    auth: boolean;
    analytics: boolean;
  };
}

export const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  appName: import.meta.env.VITE_APP_NAME || 'Draxen AI',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
  features: {
    auth: import.meta.env.VITE_ENABLE_AUTH === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },
};
