import { Page, Locator, expect } from "@playwright/test";

export class RegisterPage {
  // Variables
  private readonly page: Page;
  private readonly registerHeading: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly privacyPolicyToggle: Locator;
  private readonly submitRegistrationButton: Locator;
  private readonly registerResultHeading: Locator;
  private readonly searchBox: Locator;
  private readonly searchButton: Locator;
  private readonly continueToAccountPage: Locator;

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
    this.submitRegistrationButton = this.page.getByRole("button", {
      name: "Continue",
    });
    this.registerResultHeading = this.page.getByRole("heading", {
      name: "Your Account Has Been Created!",
    });
    this.searchBox = this.page.getByPlaceholder("Search");
    this.searchButton = this.page.locator(
      "//button[@class='btn btn-light btn-lg']",
    );
    this.continueToAccountPage = this.page.getByRole("link", {
      name: "Continue",
    });
  }

  // actions

  async verifyRegisterPageLoaded(): Promise<void> {
    await expect(this.registerHeading).toBeVisible();
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

  async submitRegistration(): Promise<void> {
    await this.submitRegistrationButton.click();
  }

  async getRegisterSuccessMessage(): Promise<string> {
    return await this.registerResultHeading.innerText();
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchBox.fill(productName);
    await this.searchButton.click();
  }

  async navigateToAccountPage(): Promise<void> {
    await this.continueToAccountPage.click();
  }
}
