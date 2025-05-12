import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// Load environment variables
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // plugins: [react(), tailwindcss()],
    plugins: [react()],
    server: {
      proxy: {
        // "/api/":`http://localhost:${env.VITE_BACKEND_PORT}`,
        // "/api/":`http://localhost:8000`,

        "/api/": {
          target: "https://alumni-backend-8eqk.onrender.com",
          changeOrigin: true,
          secure: true,
          cookieDomainRewrite: {
            "*": "", // This allows cookies to be sent to the current domain
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        },
      },
      port: parseInt(env.VITE_PORT) || 5173, // Read from .env, fallback to 5173
    },
  };
});
