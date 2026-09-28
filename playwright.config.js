// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 40 * 1000,
  },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retention on-failure', 
    /*collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },
   
});
module.exports = config

