import { test, expect } from '@playwright/test';

test('Borrower selection updates center pane', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByText('Sarah Dunn').click();
  await expect(page.locator('h2')).toContainText('Sarah Dunn');
});

test('Explainability section expands/collapses', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByText('Sarah Dunn').click();

  const accordion = page.getByRole('button', { name: /AI Explainability/i });
  await expect(accordion).toBeVisible();

  const content = page.locator('[data-testid="ai-explainability-content"]');

  await expect(page.locator('text=Income Inconsistent with Bank statements')).toBeVisible();

  await accordion.click();
  await expect(content).not.toBeVisible();
  await accordion.click();
  await expect(content).toBeVisible();
  await expect(page.locator('text=High Debt-to-Income Ratio detected')).toBeVisible();
});


test('Button click logs to console', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByText('Sarah Dunn').click();

  const requestBtn = page.getByText('Request Documents');
  await expect(requestBtn).toBeVisible();

  page.on('console', msg => {
    if (msg.type() === 'log') {
      console.log('Console Output:', msg.text());
    }
  });
  await requestBtn.click();
});
