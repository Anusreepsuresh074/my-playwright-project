import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly input: Locator;
  readonly items: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;
  readonly clearCompletedBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.getByPlaceholder('What needs to be done?');
    this.items = page.locator('.todo-list li');
    this.filterAll = page.getByRole('link', { name: 'All' });
    this.filterActive = page.getByRole('link', { name: 'Active' });
    this.filterCompleted = page.getByRole('link', { name: 'Completed' });
    this.clearCompletedBtn = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto() { await this.page.goto('/todomvc'); }

  async add(...texts: string[]) {
    for (const t of texts) { await this.input.fill(t); await this.input.press('Enter'); }
  }

  item(text: string) {
    return this.items.filter({ hasText: text });
  }

  async complete(text: string) { await this.item(text).locator('.toggle').check(); }

  async expectItems(count: number) { await expect(this.items).toHaveCount(count); }

}

