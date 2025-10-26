import { test, expect } from '@playwright/test';

test.describe('TodoMVC – core user journeys', () => {
  test('add items, complete one, verify filters and persistence', async ({ page }) => {
    await page.goto('/todomvc');

    // Add 3 todos
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Buy milk'); await input.press('Enter');
    await input.fill('Pay bills'); await input.press('Enter');
    await input.fill('Read book'); await input.press('Enter');

    const items = page.locator('.todo-list li');
    await expect(items).toHaveCount(3);

    // Complete "Pay bills"
    await items.filter({ hasText: 'Pay bills' }).locator('.toggle').check();
    await expect(items.filter({ has: page.locator('.completed') })).toHaveCount(1);

    // Filter: Active
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(items).toHaveCount(2);
    await expect(items).toContainText(['Buy milk', 'Read book']);

    // Filter: Completed
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(items).toHaveCount(1);
    await expect(items.first()).toContainText('Pay bills');

    // Back to All, verify state persists
    await page.getByRole('link', { name: 'All' }).click();
    await expect(items).toHaveCount(3);
  });
});
