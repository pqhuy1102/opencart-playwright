import { Page, Locator } from "@playwright/test";

export class HomePage {
  // Variables
  private readonly page: Page;
  private readonly myAccountDropdown: Locator;
  private readonly loginOption: Locator;
  private readonly registerOption: Locator;
  private readonly logoutOption: Locator;
  private readonly searchBox: Locator;
  private readonly searchButton: Locator;
  private readonly shoppingCartButton: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    this.myAccountDropdown = this.page.locator("span:has-text('My Account')");
    this.loginOption = this.page.getByText("Login");
    this.registerOption = this.page.getByText("Register");
    this.searchBox = this.page.getByPlaceholder("Search");
    this.searchButton = this.page.locator(
      "//button[@class='btn btn-light btn-lg']",
    );
    this.shoppingCartButton = this.page.getByText("Shopping Cart");
    this.logoutOption = this.page.getByText("Logout");
  }

  // actions
  async isHomePageLoaded(): Promise<boolean> {
    let title = await this.page.title();
    if (title.includes("Your Store")) {
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

  async searchProduct(productName: string): Promise<void> {
    await this.searchBox.fill(productName);
    await this.searchButton.click();
  }

  async clickShoppingCartButton(): Promise<void> {
    await this.shoppingCartButton.click();
  }

  async isLogoutOptionAvailable(): Promise<boolean> {
    if (await this.logoutOption.isVisible()) {
      return true;
    } else {
      return false;
    }
  }

  async clickLogoutOption(): Promise<void> {
    await this.logoutOption.click();
  }
}
