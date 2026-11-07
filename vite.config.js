import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH is the folder the site is served from.
// GitHub Pages (finxpert88.github.io/claudeandvscode/) needs '/claudeandvscode/'.
// Locally, or on a custom domain like claudeandvscode.com, it's just '/'.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: { port: 5173, open: true },
})
