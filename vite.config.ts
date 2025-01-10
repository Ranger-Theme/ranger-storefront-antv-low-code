import { baseConfig } from '@ranger-theme/vite-config'
import path from 'node:path'
import type { ConfigEnv } from 'vite'
import { defineConfig } from 'vite'

import pkg from './package.json'

const viteConfig: any = ({ mode }: ConfigEnv) => {
  const defaultConfig: any = baseConfig({
    mode,
    pkg,
    https: false,
    port: 3000,
    outDir: 'build',
    entry: '/bootstrap/main.tsx'
  })

  return defineConfig({
    ...defaultConfig,
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
        '~': path.resolve(__dirname, './')
      }
    },
    server: {
      host: '127.0.0.1',
      port: 3000
    }
  })
}

export default viteConfig
