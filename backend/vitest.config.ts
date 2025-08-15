import { defineConfig } from 'vitest/config.js';

export default defineConfig({
  test: {
    env: {
      NODE_ENV: 'test'
    },
    setupFiles: ['./test-setup.ts']
  }
});
