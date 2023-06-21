import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import antdLayout from './plugins'
import * as path from 'path'
import { theme } from 'antd/lib';
import { convertLegacyToken } from '@ant-design/compatible/lib';

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);
const v4Token = convertLegacyToken(mapToken);

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
        modifyVars:v4Token,
      },
    },
  },
  
  plugins: [react(), antdLayout()],
})
