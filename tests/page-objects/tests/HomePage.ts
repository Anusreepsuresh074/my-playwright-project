import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly getStarted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStarted = page.getByRole('link', { name: /get started/i });
  }

  async goto() {
    await this.page.goto('/');
  }

  async verifyVisible() {
    await expect(this.getStarted).toBeVisible();
  }
}
