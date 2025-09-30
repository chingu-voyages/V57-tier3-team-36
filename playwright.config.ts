if (!process.env.CI) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@dotenvx/dotenvx').config({ path: '.env.test' });
}

import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'fs';
import { authFile } from '@/tests/constants';

export default defineConfig({
  forbidOnly: !!process.env.CI,

  testDir: './src/tests',

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        headless: false,
      },
      timeout: 120000,
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Only use storageState if the file exists
        ...(existsSync(authFile) ? { storageState: authFile } : {}),
      },
    },
  ],

  reporter: process.env.CI ? 'dot' : 'list',

  use: {
    baseURL: 'http://localhost:3000',
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    stdout: process.env.DEBUG ? 'pipe' : undefined,
    stderr: 'pipe',
  },
});
