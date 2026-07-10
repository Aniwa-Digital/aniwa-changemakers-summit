import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5180 },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/examples/jsm/postprocessing')) {
            return 'three-post';
          }
          if (id.includes('node_modules/three')) {
            return 'three';
          }
        },
      },
    },
  },
});
