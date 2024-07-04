import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  build: {
    rollupOptions: {
      external: [
        'react-router',
        'react-router-dom'
      ]
    }
  }
=======
>>>>>>> f014ba2d43164f035c62eb8a8e82b7333e688cb0
})
