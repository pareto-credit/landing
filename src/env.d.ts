/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_ENDPOINT: string
  readonly PUBLIC_API_ACCESS_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
