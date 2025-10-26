import { test as base } from '@playwright/test';
import { TodoPage } from '../../../src/pages/TodoPage';


type Fixtures = { todo: TodoPage };

export const test = base.extend<Fixtures>({
  todo: async ({ page }, use) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await use(todo);
  },
});

export { expect } from '@playwright/test';
