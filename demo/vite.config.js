import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions:{
        input: path.resolve(__dirname, "./src/main.js")
    },
    outDir: 'dist', // 打包输出目录
    sourcemap: true, // 是否生成 sourcemap
  },
  server: {
    port: 3000, // 开发服务器端口
    open: true, // 自动打开浏览器
  }
});
