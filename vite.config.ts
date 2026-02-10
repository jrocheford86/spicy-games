// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/spicy-games/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
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
        display: "standalone", // ESTO OCULTA LA BARRA
        start_url: "/spicy-games/index.html",
        scope: "/spicy-games/",
        orientation: "portrait",
        icons: [
          {
            // CORREGIDO: Nombre exacto de tu archivo
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            // CORREGIDO: Nombre exacto de tu archivo
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
