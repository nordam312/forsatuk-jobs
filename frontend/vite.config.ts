import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Forward cookies from the browser
            const cookieHeader = req.headers.cookie;
            if (cookieHeader) {
              proxyReq.setHeader('Cookie', cookieHeader);
            }
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Forward Set-Cookie headers from the backend
            const setCookieHeaders = proxyRes.headers['set-cookie'];
            if (setCookieHeaders) {
              res.setHeader('Set-Cookie', setCookieHeaders);
            }
          });
        }
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
