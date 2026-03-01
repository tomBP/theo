const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1024, height: 768 },
  },
  webServer: {
    command: 'npx serve -l 3847 -s .',
    port: 3847,
    reuseExistingServer: true,
  },
});
