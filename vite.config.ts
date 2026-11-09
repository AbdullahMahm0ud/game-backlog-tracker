import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' lets the built site work under https://<user>.github.io/<repo>/
export default defineConfig({
  base: './',
  plugins: [react()],
})
