import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  watch: {
    usePolling: true,
  },
  server: {
    port: 3000, // Change this to your desired port number
  },
});
