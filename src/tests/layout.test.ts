import { test, expect } from '@playwright/test';

const viewportSizes = [
  { width: 375, height: 667, name: '375x667-xs' },
  { width: 640, height: 800, name: '640x800-sm' },
  { width: 768, height: 1024, name: '768x1024-md' },
  { width: 1024, height: 768, name: '1024x768-lg' },
];

test.describe('HomePage Layout Tests', () => {
  for (const viewport of viewportSizes) {
    test(`homepage layout ${viewport.name}`, async ({ page }) => {
      await page.goto('/');
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await expect(page).toHaveScreenshot(`homepage-${viewport.name}.png`, {
        animations: 'disabled' as const,
        mask: [
          page.locator('[data-label="PullsListCard"]'),
          page.locator('[data-label="StatsCard"]'),
          page.locator('[data-label="HeaderContents"]'),
          page.locator('[data-label="Sidebar"]'),
        ],
      });
    });
  }
});
