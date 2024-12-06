import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.VITE_PORT || 5173,
  },
  plugins: [react()],
})
