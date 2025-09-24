import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  forbidOnly: !!process.env.CI,

  testDir: './src/tests',

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  reporter: process.env.CI ? 'dot' : 'list',

  use: {
    baseURL: 'http://localhost:3000',
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
