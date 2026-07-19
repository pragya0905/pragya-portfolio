import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // tsParticles' engine loads its own plugins (move, interactivity,
        // blend modes, shape drawing, etc.) via internal dynamic import()
        // calls, which Rollup splits into ~8 separate chunks by default —
        // each one only requested after the previous resolves, adding a
        // visible sequential-network-waterfall delay before the particle
        // background actually renders. Forcing them into one chunk turns
        // that into a single request loaded alongside the main bundle.
        manualChunks(id) {
          if (id.includes('tsparticles')) return 'tsparticles'
        },
      },
    },
  },
})
