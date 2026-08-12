# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Login.spec.ts >> Login with valid credentials
- Location: tests\Login.spec.ts:17:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { HomePage } from "../pages/HomePage";
  3  | import { LoginPage } from "../pages/LoginPage";
  4  | import { TestConfig } from "../test.config";
  5  | 
  6  | let homePage: HomePage;
  7  | let loginPage: LoginPage;
  8  | let config: TestConfig;
  9  | 
  10 | test.beforeEach(async ({ page }) => {
  11 |   config = new TestConfig();
  12 |   await page.goto(`${config.appUrl}`);
  13 |   homePage = new HomePage(page);
  14 |   loginPage = new LoginPage(page);
  15 | });
  16 | 
  17 | test("Login with valid credentials", async ({ page }) => {
  18 |   // Navigate to login page
  19 |   const isHomePageLoaded = await homePage.isHomePageLoaded();
  20 |   expect(isHomePageLoaded).toBeTruthy();
  21 |   await homePage.clickMyAccountDropdown();
  22 |   await homePage.clickLoginOption();
  23 | 
  24 |   // Login page
  25 |   const isLoginPageLoaded = await loginPage.isLoginPageLoaded();
> 26 |   expect(isLoginPageLoaded).toBeTruthy();
     |                             ^ Error: expect(received).toBeTruthy()
  27 |   await loginPage.inputLoginForm(config.email, config.password);
  28 |   await loginPage.clickLoginButton();
  29 | 
  30 |   await homePage.clickMyAccountDropdown();
  31 |   const isLoggedIn = await homePage.isLogoutOptionAvailable();
  32 |   expect(isLoggedIn).toBeTruthy();
  33 | });
  34 | 
  35 | test.afterEach(async ({ page }) => {
  36 |   await page.close();
  37 | });
  38 | 
```