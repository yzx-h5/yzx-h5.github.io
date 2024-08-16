import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';

export default defineConfig({
  plugins: [
    react(),
    legacy(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({ overrideBrowserslist: ['> 1%', 'last 2 versions'] }),
        pxtorem({
          rootValue: 16, // 根元素字体大小
          unitPrecision: 5, // 转换精度
          propList: ['*'], // 需要转换的属性
          selectorBlackList: [], // 不需要转换的选择器
          replace: true, // 替换旧值
          mediaQuery: false, // 媒体查询中的 px 是否需要转换
          minPixelValue: 0 // 小于或等于 0 的 px 不转换
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        prependData: `@import "@/theme/variables.scss";`
      }
    }
  }
});
