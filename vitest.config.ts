import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    silent: true,
    include: ['src/**/*.test.tsx'],
    setupFiles: ['./tests/mocks/setupTests.ts', './tests/mocks/setup.ts'],
  },
});
