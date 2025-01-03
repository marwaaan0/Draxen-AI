/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ENABLE_AUTH: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENVIRONMENT: string
}
