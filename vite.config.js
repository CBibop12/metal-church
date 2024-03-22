import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/querys":"http://metalchurch.nl:5050/query/",
    }  
  } ,
  plugins: [react()],
})
