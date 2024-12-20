import { defineConfig, devices } from 'playwright/test'

export default defineConfig({
  testDir: './tests', // Directory for tests
  timeout: 30000,     // 30 seconds timeout for each test
  retries: 1,         // Retry once on failure
  use: {
    baseURL: 'http://localhost:5173', // Base URL of your Vite dev server
    trace: 'on-first-retry',          // Collect traces on first retry
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});