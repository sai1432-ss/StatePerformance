import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'stats.html', // Generates a local stats file on build
      open: false,            // Prevents it from automatically opening in your browser during automated grading
      gzipSize: true,
      brotliSize: true,
    })
  ]
})