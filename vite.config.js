import { defineConfig } from 'vite';
import path from 'node:path';
import viteImagemin from 'vite-plugin-imagemin';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig(() => {
  const isTest = false;
  const baseRoot = '/';

  return {
    root: path.resolve(__dirname, 'src'),
    base: baseRoot,
    build: {
      outDir: '../public',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'src/index.html'),
          test: path.resolve(__dirname, 'src/test.html'),
          projects01: path.resolve(__dirname, 'src/projects/bespoke/index.html'),
          projects02: path.resolve(__dirname, 'src/projects/care/index.html'),
          detail01: path.resolve(__dirname, 'src/detail/bespoke.html'),
          detail02: path.resolve(__dirname, 'src/detail/care.html'),
          detail03: path.resolve(__dirname, 'src/detail/adstorm.html'),
          detail04: path.resolve(__dirname, 'src/detail/cpg.html'),
          detail05: path.resolve(__dirname, 'src/detail/dacor.html'),
        },
        output: {
          assetFileNames: (assetInfo) => {
            return assetInfo.name.endsWith('.css')
              ? 'assets/styles/[name][extname]'
              : 'assets/images/[name][extname]';
          },
          chunkFileNames: 'assets/js/[name].js',
          entryFileNames: 'assets/js/[name].js',
        },
      },
      assetsInclude: ['**/*.pdf'],
      assetsInlineLimit: 1024,
    },
    preview: {
      host: true,
    },
    plugins: [
      viteImagemin({
        cache: true,
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
              active: false,
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
      handlebars({
        partialDirectory: path.resolve(__dirname, './src/partials'),
        helpers: {
          rootSrc: baseRoot,
        },
      }),
    ],
  };
});
