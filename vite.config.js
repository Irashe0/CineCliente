import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: process.env.NODE_ENV === 'development' ? {
      '/login': 'http://localhost:8000',
      '/register': 'http://localhost:8000',
    } : {},
  },
});
