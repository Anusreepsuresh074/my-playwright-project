import { test } from '@playwright/test';
import { HomePage } from './HomePage';

test('home via POM', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.verifyVisible();
});
