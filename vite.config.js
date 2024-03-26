import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/query":"http://metalchurch.nl:5050/",
    }  
  } ,
  plugins: [react()],
})
