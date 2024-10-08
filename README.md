# 김재환 포트폴리오 사이트

[vite] 프레임 워크를 이용한 반응형 웹 포트폴리오 사이트 입니다.

## 완성작 보기
미리보기: https://portfolio-hwan.netlify.app/

## 사용 스택
- vite(https://ko.vitejs.dev/) 를 사용하여 사이트를 번들링하고 관리합니다.
- vite-plugin-imagemin(https://www.npmjs.com/package/@vheemstra/vite-plugin-imagemin) 를 사용하여 모든 이미지 파일을 압축 / 최적화 합니다.
- vite-plugin-handlebars(https://www.npmjs.com/package/vite-plugin-handlebars) 를 사용하여 HTML 템플릿을 생성합니다.
- sass(https://sass-lang.com/) 를 사용하여 CSS를 관리 합니다.
- Autoprefixer(https://www.npmjs.com/package/autoprefixer) 를 사용하여 브라우저 호환성을 높입니다.
- cssnano(https://www.npmjs.com/package/cssnano) 를 사용하여 CSS를 최소화 합니다.
- gsap(https://greensock.com/gsap) 를 이용하여 패럴랙스 효과를 줍니다.
<!-- - mouse-follower(https://www.npmjs.com/package/mouse-follower?activeTab=readme) 를 사용하여 마우스 효과를 줍니다. -->
- swiper(https://swiperjs.com/) 를 사용하여 슬라이드 효과를 줍니다.
- netlify(https://www.netlify.com/) 를 통해 사이트를 배포합니다.
- git(https://github.com/) 을 사용하여 파일을 관리합니다.
- HTML 웹 표준 및 웹 접근성을 준수하여 작업합니다.

## 프로젝트 실행
- [vite] `npm create vite@latest`
- [vite-plugin-imagemin] `npm install vite-plugin-imagemin --save-dev`
- [vite-plugin-handlebars] `npm install vite-plugin-handlebars --save-dev`
- [sass] `npm add -D sass`
- [Autoprefixer] `npm install autoprefixer postcss --save-dev`
- [cssnano] `npm install cssnano --save-dev`
- [gsap] `npm install gsap`
<!-- - [mouse-follower] `npm install mouse-follower` -->
- [swiper] `npm install swiper`

### vite.config.js
```javascript
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import handlebars from 'vite-plugin-handlebars';
import path from 'node:path';

export default defineConfig(() => {
  const isTest = false;
  const baseRoot = isTest ? '/hwan/' : '/';

  return {
    root: path.resolve(__dirname, 'src'),
    base: baseRoot,
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'src/index.html'),
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
      handlebars({
        partialDirectory: path.resolve(__dirname, './src/partials'),
        helpers: {
          rootSrc: baseRoot
        }
      }),
    ],
  }
});
```

### postcss.config.cjs
```javascript
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};

```