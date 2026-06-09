import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use relative paths so the Electron file:// protocol works for production builds
  base: './',
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    // Don't open the browser automatically (Electron handles the window)
    open: false,
  },
  // electron.js and server/ in public/ are Electron/Node files, not web assets.
  // Disable automatic copying of publicDir to keep the build output clean.
  publicDir: false,
})
