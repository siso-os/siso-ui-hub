import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  // UIHUB_PUBLIC_DIR=public-pub builds the public site from the publicised export (npm run build:public)
  publicDir: process.env.UIHUB_PUBLIC_DIR || "public",
  plugins: [react(), tailwindcss()],
  // HUB_PACKAGES: the hosted hub's copy of src/data/siso-packages.json with private names taken out
  // (scripts/scrub-packages.py, run by deploy-pages.sh), because its bundle is downloadable before sign-in
  resolve: {
    alias: [
      ...(process.env.HUB_PACKAGES ? [{ find: "@/data/siso-packages.json", replacement: process.env.HUB_PACKAGES }] : []),
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
  build: { chunkSizeWarningLimit: 1200 },
})
