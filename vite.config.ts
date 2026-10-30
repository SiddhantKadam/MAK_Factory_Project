import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_")

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Dev-only component playground: on for `vite dev`, off for builds unless
      // VITE_ENABLE_PLAYGROUND=true. A literal, so dead code is removed at build.
      __SHOW_PLAYGROUND__: JSON.stringify(command === "serve" || env.VITE_ENABLE_PLAYGROUND === "true"),
    },
  }
})
