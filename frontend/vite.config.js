import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Load environment variables
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy:{
        "/api/":`http://localhost:${env.VITE_BACKEND_PORT}`
      },
      port: parseInt(env.VITE_PORT)  // Read from .env, fallback to 5173
    },
  };
});

