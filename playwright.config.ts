import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // 👇 Dual reporter: HTML for humans + JSON for Prometheus exporter
  reporter: [
    ['html', { outputFolder: 'results/html-report' }],
    ['json', { outputFile: 'results/test-results.json' }]
  ],

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Auth',
      testMatch: /.*login\.spec\.ts/, // login tests first
      use: {
        storageState: undefined,
      },
    },
    {
      name: 'Home Tests',
      testMatch: /.*home\.spec\.ts/, // depends on Auth
      use: {
        storageState: 'state.json',
      },
      dependencies: ['Auth'], // 👈 keep dependency order
    }
  ],
});
