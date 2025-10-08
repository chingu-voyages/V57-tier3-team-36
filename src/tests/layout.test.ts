import { expect, test } from '@playwright/test';

const viewportSizes = [
  { width: 375, height: 667 },
  { width: 640, height: 800 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
];

test.describe('HomePage Layout Tests', () => {
  for (const viewport of viewportSizes) {
    const name = `${viewport.width}x${viewport.height}`;

    test(`homepage layout ${name}`, async ({ page }) => {
      await page.goto('/');
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await expect(page).toHaveScreenshot(`homepage-${name}.png`, {
        animations: 'disabled' as const,
        mask: [
          page.locator('[data-label="PullsListCard"]'),
          page.locator('[data-label="StatsCards"]'),
          page.locator('[data-label="HeaderContents"]'),
          page.locator('[data-label="Sidebar"]'),
        ],
      });
    });
  }
});
