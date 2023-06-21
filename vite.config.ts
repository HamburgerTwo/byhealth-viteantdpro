import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import antdLayout from './plugins'
import * as path from 'path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;',
      },
    },
  },
  
  plugins: [react(), antdLayout()],
})
