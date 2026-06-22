import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
// Allow overriding the base URL so the same test suite runs locally against
// `npm run preview` AND against production (post-deploy smoke).
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:4173';

export default defineConfig({
  testDir: 'e2e',
  timeout: 30_000,
  retries: isCI ? 2 : 0,
  forbidOnly: isCI,
  reporter: isCI ? [['github'], ['list']] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    // Use Pixel 5 (Chromium-based) for mobile emulation so we don't have to
    // download WebKit in CI. Covers responsive concerns without the extra weight.
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
  // Only start a local server when no external base URL was provided.
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'npm run preview -- --host 127.0.0.1 --port 4173',
        url: 'http://127.0.0.1:4173',
        reuseExistingServer: !isCI,
        timeout: 120_000,
      },
});
