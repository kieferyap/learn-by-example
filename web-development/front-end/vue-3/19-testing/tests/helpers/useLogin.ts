import { Page } from 'playwright/test';

export async function useLogin(page: Page) {
  // Navigate to the homepage
  await page.goto('/');

  // Login
  await page.fill('input[name="username"]', 'tester');
  await page.fill('input[name="password"]', 'TestPassword1000');
  await page.click('button[name="login"]');
}