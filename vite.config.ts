import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/See-You-Story/', // 设置基础路径
  build: {
    outDir: 'build',
    sourcemap: true,
  },
}); 