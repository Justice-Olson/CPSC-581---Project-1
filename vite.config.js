import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/CPSC-581---Project-1/',
  plugins: [react()],
})
