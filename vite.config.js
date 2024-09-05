import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import path from 'node:path';

export default defineConfig(() => {

  return {
    root: path.resolve(__dirname, 'src'),
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'src/index.html'),
          projects01: path.resolve(__dirname, 'src/projects/samsung_bespoke/index.html'),
          projects02: path.resolve(__dirname, 'src/projects/samsung_care/index.html'),
        },
        output: {
          assetFileNames: (assetInfo) => {
            let result = 'assets/images/[name][extname]';
            if (assetInfo.name.split('.')[1] === 'css') {
              result = 'assets/styles/[name][extname]';
            }
            return result;
          },
          chunkFileNames: 'assets/js/[name].js',
          entryFileNames: 'assets/js/[name].js',
        },
      },
    },
    preview: {
      host: true,
    },
    plugins: [
      viteImagemin({
        cache: true, // 캐시를 활성화하여 빌드 시간을 줄입니다.
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 75,
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
              active: false, // viewBox 속성을 제거하지 않음
            },
            {
              name: 'removeEmptyAttrs',
              active: false, // 빈 속성을 제거하지 않음
            },
          ],
        },
      }),
    ],
  }
});
