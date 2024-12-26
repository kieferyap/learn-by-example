import { test, expect } from 'playwright/test'
import { useLogin } from './helpers/useLogin'

test('01 Page title', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/')

  // Verify homepage title
  await expect(page).toHaveTitle('20-docker')
});

test('02 CRUD on posts', async ({ page }) => {
  // Login
  await useLogin(page)

  // Navigate to new post
  await page.goto('/posts/new')

  // Create post
  await page.fill('input[name="post-title"]', 'Sample Post')
  await page.fill('textarea[name="post-body"]', 'This is a sample blog post')
  await page.click('button[name="post-submit"]')

  // Verify post
  await expect(page.locator('text=Sample Post')).toBeVisible()

  // Edit post
  await page.click('button[name="post-edit-cancel"]')
  await page.fill('textarea[name="post-body"]', 'Updated content.')
  await page.click('button[name="post-submit"]')

  // Verify updated post
  await expect(page.locator('text=Updated content.')).toBeVisible()

  // Delete the post
  await page.click('button[name="post-delete"]')
  await expect(page.locator('text=Sample Post')).not.toBeVisible()
})

// You can use test.only() instead of test() if you want to run only this one test within the file
test('03 Access post of other user', async ({ page }) => {
  // Login
  await useLogin(page)

  // Go to another user's post
  await page.goto('/posts/1')
  await expect(page.locator('text=Error 404.')).toBeVisible()
})