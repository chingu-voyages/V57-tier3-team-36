import { test as setup } from '@playwright/test';
import { existsSync, readFileSync } from 'fs';

setup('authenticate', async ({ page }) => {
  const authFile = 'playwright/.auth/user.json';

  // Check if auth file exists and is still valid
  if (existsSync(authFile)) {
    const authState = JSON.parse(readFileSync(authFile, 'utf-8'));
    const sessionCookie = authState.cookies.find(
      (c: Record<string, string>) => c.name === 'better-auth.session_token'
    );

    // Check if session is expired (expires is in seconds since epoch)
    if (sessionCookie && sessionCookie.expires > Date.now() / 1000) {
      console.log('Session is still valid, skipping authentication');
      return; // Skip setup if session is still valid
    }
  }

  console.log('Session expired or missing, authenticating...');
  await page.goto('/');
  await page.click('text=Sign in');

  // Wait for something that indicates you're logged in
  await page.waitForSelector('text=Sign out');

  // Save the authenticated state
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
