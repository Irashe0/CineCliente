import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, 
    open: true, 
    proxy: {
      "/api": "https://laravelcine-cine-zeocca.laravel.cloud", 
    },
  },
  build: {
    outDir: "dist", 
    sourcemap: true, 
  },
});
