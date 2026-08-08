import { Page, Locator } from "@playwright/test";

export class LoginPage {
  // Variables
  private readonly page: Page;
  private readonly loginHeading: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    this.loginHeading = this.page.getByRole("heading", {
      name: "Login",
    });
    this.emailInput = this.page.locator("#input-email");
    this.passwordInput = this.page.locator("#input-password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
  }

  // actions
  async isLoginPageLoaded(): Promise<boolean> {
    if (await this.loginHeading.isVisible()) {
      return true;
    } else {
      return false;
    }
  }

  async inputLoginForm(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }
}
