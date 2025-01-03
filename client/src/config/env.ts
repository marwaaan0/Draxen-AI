interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ENABLE_AUTH: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENVIRONMENT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  features: {
    enableAuth: import.meta.env.VITE_ENABLE_AUTH === 'true',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },
  app: {
    name: import.meta.env.VITE_APP_NAME,
    version: import.meta.env.VITE_APP_VERSION,
    environment: import.meta.env.VITE_APP_ENVIRONMENT as 'development' | 'production' | 'test',
    isDevelopment: import.meta.env.VITE_APP_ENVIRONMENT === 'development',
    isProduction: import.meta.env.VITE_APP_ENVIRONMENT === 'production',
    isTest: import.meta.env.VITE_APP_ENVIRONMENT === 'test',
  },
} as const;
