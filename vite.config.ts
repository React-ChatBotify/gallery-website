import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import path from 'path';

import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    root: 'src',
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        name: 'react-chatbotify',
        fileName: 'index',
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
      },
      outDir: '../dist',
    },
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.wav'],
    plugins: [
      svgr({
        svgrOptions: {
          ref: true,
        },
      }),
      react({
        include: '**/*.{jsx,tsx}',
      }),
      dts(),
    ],
    server: {
      port: 3000,
      host: true,
    },
  });
};
