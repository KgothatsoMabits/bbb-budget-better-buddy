import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', 
  base: '/frontend/', 
  build: {
    outDir: '../dist', 
  },
});