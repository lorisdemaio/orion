import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
     VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['orion_logo.webp', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Orion',
        short_name: 'Orion',
        description: '',
        theme_color: '#001524',
        icons: [
          {
            src: 'orion_logo.webp',
            sizes: '192x192',
            type: 'image/webp'
          },
          {
            src: 'orion_logo.webp',
            sizes: '512x512',
            type: 'image/webp'
          }
        ]
      }
    })
  ],
})
