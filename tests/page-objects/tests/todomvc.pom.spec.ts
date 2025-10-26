import { test, expect } from './_fixtures';

test('POM: add/complete/clear', async ({ todo }) => {
  await todo.add('Task A', 'Task B', 'Task C');
  await todo.expectItems(3);
  await todo.complete('Task B');
  await expect(todo.clearCompletedBtn).toBeVisible();
});
