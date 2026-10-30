/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Set to "true" to include the component playground in a build (e.g. staging). */
  readonly VITE_ENABLE_PLAYGROUND?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Replaced at build time — see vite.config.ts. */
declare const __SHOW_PLAYGROUND__: boolean
