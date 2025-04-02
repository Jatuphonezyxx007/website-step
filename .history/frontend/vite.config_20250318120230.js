import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"; // ✅ Import path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
