import { Page, Locator } from "@playwright/test";

export class MyAccountPage {
  // Variables
  private readonly page: Page;
  private readonly loginOption: Locator;
  private readonly registerOption: Locator;
  private readonly logoutOption: Locator;
  private readonly logoutButton: Locator;
  private readonly pageContent: Locator;
  private readonly myAccountHeading: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    this.pageContent = this.page.locator("div#content");
    this.myAccountHeading = this.pageContent.locator("h1");
    this.loginOption = this.page.getByText("Login");
    this.registerOption = this.page.getByText("Register");
    this.logoutOption = this.page.getByText("Logout");
    this.logoutButton = this.page.locator("a.list-group-item").last();
  }

  // actions
  async isMyAccountLoaded(): Promise<boolean> {
    let myAccountHeader = await this.myAccountHeading.innerText();
    if (myAccountHeader === "My Account") {
      return true;
    } else {
      return false;
    }
  }

  async clickLoginOption(): Promise<void> {
    await this.loginOption.click();
  }

  async clickRegisterOption(): Promise<void> {
    await this.registerOption.click();
  }
}
