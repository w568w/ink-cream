/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VALINE_APP_ID: string
  readonly VITE_VALINE_APP_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'valine'; // Valine comment system
