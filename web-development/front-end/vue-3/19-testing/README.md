# About
## Objective
To learn how to do end-to-end testing with Playwright
- Install/Setup
  - Setting up Playwright
  - Configuration
- Testing
  - Writing tests
  - Helpers (Composables)
  - Running specific tests

## Running the Demo
- Navigate to the `19-testing` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run dev` to run the front end server
- Run `npx tsx fake-api-server.ts` to run the backend server
- Run `npm run test:headed` to run an end-to-end test

# Install and Setup
## Setting up Playwright
Run the following command in the project directory to install Playwright as a development dependency.
```bash
npm install -D playwright
```

Run the following to launch the Playwright CLI, which will do the following:
- Install the necessary browsers for testing (Chrome, FireFox, and Webkit)
- Create a `playwright.config.ts` file in the project root, with a basic configuration.
```bash
npx playwright install
```

## Configuration
- Check out [playwright.config.ts](./playwright.config.ts) for more information on the configuration, but essentially, it houses information on the following:
  - Default test directory (e.g.: `./tests`)
  - Timeout for each test
  - How many times to retry the test if it fails
  - The base URL of the main project (e.g.: `http://localhost:5173`)
  - What browsers to use for testing (e.g.: `chromium`, `firefox`)

- Test scripts can be added in [package.json](./package.json)
  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "host": "vite preview --host",
    
    // Testing scripts:
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed",
    "test:debug": "npx playwright test --debug"
  },
  ```
  - With these scripts, you can run the following:
    - `npm run test`: Runs all the tests inside `./tests`
    - `npm run test:headed`: Runs all the tests inside `./tests` with a visible browser.
    - `npm run test:debug`: Runs all the tests inside `./tests` with a visible browser, but pretty much has a breakpoint after each statement.

# Testing
## Writing tests
The following is a simple test that checks the title of the webpage ([01-post-crud.spec.ts](./tests/01-post-crud.spec.ts)):

  ```javascript
  import { test, expect } from 'playwright/test'

  test('01 Page title', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Verify homepage title
    await expect(page).toHaveTitle('19-testing')
  });
  ```

Here are other helpful test commands:
  ```javascript
  // Fills in "Sample Post" inside an <input> tag with name "post-title"
  await page.fill('input[name="post-title"]', 'Sample Post')

  // Clicks a <button> tag with name "post-submit"
  await page.click('button[name="post-submit"]')

  // A test to check if the text "Sample Post" is visible.
  await expect(page.locator('text=Sample Post')).toBeVisible()

  // A test to check if the text "Sample Post" is NOT visibly.
  await expect(page.locator('text=Sample Post')).not.toBeVisible()
  ```

## Helpers (Composables)
- If certain actions are repeated across multiple tests, then helpers can be used to help streamline the code.
- The standard approach is to extract such repeating code to reusable utilities, just like with composables.
- An example of one can be seen in [useLogin.ts](./tests/helpers/useLogin.ts), which is a block of code that logs in the user with the specified username and password:
  ```javascript
  import { Page } from 'playwright/test';

  export async function useLogin(page: Page) {
    // Navigate to the homepage
    await page.goto('/');

    // Login
    await page.fill('input[name="username"]', 'tester');
    await page.fill('input[name="password"]', 'TestPassword1000');
    await page.click('button[name="login"]');
  }
  ```
- It can be used like so:
  ```javascript
  import { useLogin } from './helpers/useLogin'

  test('02 CRUD on posts', async ({ page }) => {
    // Login
    await useLogin(page)

    // Navigate to new post
    await page.goto('/posts/new')

    // More code below
    // ...
  })
  ```
- While not shown in this project, another way to achieve something similar is through Playwright Fixtures
  - For more information on fixtures, see: https://playwright.dev/docs/test-fixtures

## Running Specific Tests
### Test Name
```bash
npx playwright test --grep "01 Page title"
```

### File Path
```bash
npx playwright test tests/01-post-crud.spec.ts
```

### Specific Test within File (`.only()`)
```javascript
  test.only('02 CRUD on posts', async ({ page }) => {
    // Login
    await useLogin(page)

    // Navigate to new post
    await page.goto('/posts/new')

    // More code below
    // ...
  })
```

### File Path and Test Name
```bash
npx playwright test tests/01-post-crud.spec.ts --grep "02 CRUD on posts"
```

# Further reading
- Playwright Documentation: https://playwright.dev
