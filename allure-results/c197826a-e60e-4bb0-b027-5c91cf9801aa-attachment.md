# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Login.spec.ts >> Login test with JSON data: Invalid Login with incorrect email format
- Location: tests\Login.spec.ts:52:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.innerText: Target page, context or browser has been closed
Call log:
  - waiting for locator('.alert.alert-danger.alert-dismissible')

```

# Test source

```ts
  1  | import { Page, Locator } from "@playwright/test";
  2  | 
  3  | export class LoginPage {
  4  |   // Variables
  5  |   private readonly page: Page;
  6  |   private readonly loginHeading: Locator;
  7  |   private readonly emailInput: Locator;
  8  |   private readonly passwordInput: Locator;
  9  |   private readonly loginButton: Locator;
  10 |   private readonly myAccountDropdown: Locator;
  11 |   private readonly logoutOption: Locator;
  12 |   private readonly errorLoginMessage: Locator;
  13 | 
  14 |   // constructor
  15 |   constructor(page: Page) {
  16 |     this.page = page;
  17 |     this.loginHeading = this.page.getByRole("heading", {
  18 |       name: "Returning Customer",
  19 |     });
  20 |     this.emailInput = this.page.locator("#input-email");
  21 |     this.passwordInput = this.page.locator("#input-password");
  22 |     this.loginButton = this.page.getByRole("button", { name: "Login" });
  23 |     this.myAccountDropdown = this.page.locator("span:has-text('My Account')");
  24 |     this.logoutOption = this.page.getByText("Logout");
  25 |     this.errorLoginMessage = this.page.locator(
  26 |       ".alert.alert-danger.alert-dismissible",
  27 |     );
  28 |   }
  29 | 
  30 |   // actions
  31 |   async isLoginPageLoaded(): Promise<boolean> {
  32 |     if (await this.loginHeading.isVisible()) {
  33 |       return true;
  34 |     } else {
  35 |       return false;
  36 |     }
  37 |   }
  38 | 
  39 |   async inputLoginForm(email: string, password: string): Promise<void> {
  40 |     await this.emailInput.fill(email);
  41 |     await this.passwordInput.fill(password);
  42 |   }
  43 | 
  44 |   async clickLoginButton(): Promise<void> {
  45 |     await this.loginButton.click();
  46 |   }
  47 | 
  48 |   async clickMyAccountDropdown(): Promise<void> {
  49 |     await this.myAccountDropdown.click();
  50 |   }
  51 | 
  52 |   async isLogoutOptionAvailable(): Promise<boolean> {
  53 |     if (await this.logoutOption.isVisible()) {
  54 |       return true;
  55 |     } else {
  56 |       return false;
  57 |     }
  58 |   }
  59 | 
  60 |   async getLoginErrorMessage(): Promise<null | string> {
> 61 |     return this.errorLoginMessage.innerText();
     |                                   ^ Error: locator.innerText: Target page, context or browser has been closed
  62 |   }
  63 | }
  64 | 
```