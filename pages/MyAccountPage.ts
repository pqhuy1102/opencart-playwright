import { Page, Locator } from "@playwright/test";

export class MyAccountPage {
  // Variables
  private readonly page: Page;
  private readonly myAccountDropdown: Locator;
  private readonly loginOption: Locator;
  private readonly registerOption: Locator;
  private readonly logoutOption: Locator;
  private readonly logoutButton: Locator;
  private readonly myAccountHeading: Locator;
  // constructor
  constructor(page: Page) {
    this.page = page;
    this.myAccountHeading = this.page.getByRole("heading", {
      name: "My Account",
    });
    this.myAccountDropdown = this.page.locator("span:has-text('My Account')");
    this.loginOption = this.page.getByText("Login");
    this.registerOption = this.page.getByText("Register");
    this.logoutOption = this.page.getByText("Logout");
    this.logoutButton = this.page.locator("a.list-group-item").last();
  }

  // actions
  async isMyAccountLoaded(): Promise<boolean> {
    if (await this.myAccountHeading.isVisible()) {
      return true;
    } else {
      return false;
    }
  }

  async clickMyAccountDropdown(): Promise<void> {
    await this.myAccountDropdown.click();
  }

  async clickLoginOption(): Promise<void> {
    await this.loginOption.click();
  }

  async clickRegisterOption(): Promise<void> {
    await this.registerOption.click();
  }
}
