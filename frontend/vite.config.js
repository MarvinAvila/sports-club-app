import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url'; // Añade esto
import { dirname, resolve } from 'path'; // Añade esto

const __dirname = dirname(fileURLToPath(import.meta.url)); // Define __dirname

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // Configuración correcta para alias
    },
  },
  server: {
    open: true,
    port: 3000,
  }
});