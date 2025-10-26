import { test as setup } from '@playwright/test';
import path from 'path';

const storagePath = path.resolve(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('https://example.com/login'); // put your real site here
  await page.fill('#email', process.env.USER_EMAIL!);
  await page.fill('#password', process.env.USER_PASS!);
  await page.click('button[type=submit]');
  await page.waitForURL('**/dashboard');
  await page.context().storageState({ path: storagePath });
});
