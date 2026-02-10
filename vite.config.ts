// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/spicy-games/",
  plugins: [
    react(),
    VitePWA({
      // 1. Esto hace que el Service Worker se actualice solo
      registerType: "autoUpdate",

      // 2. Opciones de Workbox para forzar la actualización rápida
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
      },

      includeAssets: [
        "favicon.png",
        "apple-touch-icon.png",
        "icons/*.png",
        "games/**/*.jpg",
      ],
      manifest: {
        name: "Spicy Games App",
        short_name: "SpicyGames",
        theme_color: "#ff2e63",
        background_color: "#080808",
        display: "standalone",
        start_url: "/spicy-games/",
        scope: "/spicy-games/",
        orientation: "portrait",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
