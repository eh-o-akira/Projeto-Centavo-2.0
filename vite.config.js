import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configuração mínima do Vite para um projeto Vue 3.
// base './' deixa o build funcionar mesmo abrindo de uma subpasta (ex.: GitHub Pages).
export default defineConfig({
  plugins: [vue()],
  base: './'
})
