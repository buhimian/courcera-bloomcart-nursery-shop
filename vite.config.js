import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/courcera-bloomcart-nursery-shop",
  plugins: [react()],
})
