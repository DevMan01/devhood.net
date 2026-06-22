import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config. Vitest config lives in vitest.config.ts so Playwright/Vite don't collide.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'build', // keep matching the Azure SWA workflow's output_location
    sourcemap: true,
  },
});
