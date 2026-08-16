import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  // Variables
  private readonly page: Page;
  private readonly loginHeading: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly myAccountDropdown: Locator;
  private readonly errorLoginMessage: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    this.loginHeading = this.page.getByRole("heading", {
      name: "Returning Customer",
    });
    this.emailInput = this.page.locator("#input-email");
    this.passwordInput = this.page.locator("#input-password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.myAccountDropdown = this.page.locator("span:has-text('My Account')");
    this.errorLoginMessage = this.page.locator(
      ".alert.alert-danger.alert-dismissible",
    );
  }

  // actions
  async verifyLoginPageLoaded(): Promise<void> {
    await expect(this.loginHeading).toBeVisible();
  }

  async inputLoginForm(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async clickMyAccountDropdown(): Promise<void> {
    await this.myAccountDropdown.click();
  }

  async getLoginErrorMessage(): Promise<string> {
    return await this.errorLoginMessage.innerText();
  }

  async getEmailValidationMessage(): Promise<string> {
    return await this.emailInput.evaluate(
      (element) => (element as HTMLInputElement).validationMessage,
    );
  }
}
