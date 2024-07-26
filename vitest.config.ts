import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import { fileURLToPath } from 'url';

export default defineConfig(configEnv => mergeConfig(
  viteConfig(configEnv),
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      root: fileURLToPath(new URL('./', import.meta.url)),
      server: {
        deps: {
          inline: ['vuetify'],
        },
      },
      coverage: {
        exclude: [
          'node_modules',
          'test',
          'dist',
          'src/style',
          'src/types',
          '*/**/*.d.ts',
          'src/App.vue',
          'src/main.ts',
          'src/enums/*.ts',
          '*.d.ts',
          '.eslintrc.js',
          'tailwind.config.js',
          'postcss.config.js',
        ],
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  })
))