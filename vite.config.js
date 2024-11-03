import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/iamport': {
        target: 'https://api.iamport.kr', // 아임포트 API 서버 주소
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/iamport/, ''), // "/iamport" 제거 후 전달
      },
    },
  },
});