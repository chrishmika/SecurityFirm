import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 2000,
    base: "/app/",
    proxy: {
      "/api": {
        target: "http://localhost:5000", //need to change for other pcs
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
