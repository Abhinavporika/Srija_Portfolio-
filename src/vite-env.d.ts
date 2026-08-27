/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHEETS_WEBAPP_URL?: string
  readonly VITE_HERO_VIDEO_URL?: string
  readonly VITE_HERO_POSTER_URL?: string
  readonly VITE_PROFILE_IMAGE_URL?: string
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
