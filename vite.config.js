import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({
    svgrOptions: {
    },

  }),],
  define: { _global: ({}), },
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://metaphorpsum.com/paragraphs/1/20',
        changeOrigin: true,
        secure: false
      }
    }

  },
})
