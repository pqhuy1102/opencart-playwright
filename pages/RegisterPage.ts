import { Page, Locator } from "@playwright/test";

export class RegisterPage {
  // Variables
  private readonly page: Page;
  private readonly registerHeading: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly privacyPolicyToggle: Locator;
  private readonly continueButton: Locator;
  private readonly registerResultHeading: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    this.registerHeading = this.page.getByRole("heading", {
      name: "Register Account",
    });
    this.firstNameInput = this.page.locator("#input-firstname");
    this.lastNameInput = this.page.locator("#input-lastname");
    this.emailInput = this.page.locator("#input-email");
    this.passwordInput = this.page.locator("#input-password");
    this.privacyPolicyToggle = this.page.locator("input[name='agree']");
    this.continueButton = this.page.getByRole("button", { name: "Continue" });
    this.registerResultHeading = this.page.getByRole("heading", {
      name: "Your Account Has Been Created!",
    });
  }

  // actions
  async isRegisterPageLoaded(): Promise<boolean> {
    if (await this.registerHeading.isVisible()) {
      return true;
    } else {
      return false;
    }
  }

  async inputRegisterForm(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickPrivacyPolicyToggle(): Promise<void> {
    await this.privacyPolicyToggle.check();
  }

  async clickContinueButton(): Promise<void> {
    await this.continueButton.click();
  }

  async getRegisterSuccessMessage(): Promise<string> {
    return await this.registerResultHeading.innerText();
  }
}
