import { test, expect } from 'playwright/test';

test('01 Page title', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/')

  // Login
  await page.fill('input[name="username"]', 'tester')
  await page.fill('input[name="password"]', 'TestPassword1000')
  await page.click('button[name="login"]')

  // Verify homepage title
  await expect(page).toHaveTitle('19-testing')
  // // Verify the page title

  // // Create a new blog post
  // await page.click('text=New Post');
  // await page.fill('input[name="title"]', 'Sample Blog Post');
  // await page.fill('textarea[name="content"]', 'This is a sample blog post.');
  // await page.click('text=Save');

  // // Verify the blog post is listed
  // await expect(page.locator('text=Sample Blog Post')).toBeVisible();

  // // Edit the blog post
  // await page.click('text=Edit');
  // await page.fill('textarea[name="content"]', 'Updated content.');
  // await page.click('text=Save');

  // // Verify the updated content
  // await expect(page.locator('text=Updated content.')).toBeVisible();

  // // Delete the blog post
  // await page.click('text=Delete');
  // await expect(page.locator('text=Sample Blog Post')).not.toBeVisible();
});
