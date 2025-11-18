import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/app/",
  server: {
    port: 2000,
    open: "/app/",
    proxy: {
      "/api": {
        target: " https://dvision-security-bbb0c037f11e.herokuapp.com/", //need to change for other pcs
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
