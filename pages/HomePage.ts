import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  // Variables
  private readonly page: Page;
  private readonly navigationHeader: Locator;
  private readonly myAccountDropdown: Locator;
  private readonly loginOption: Locator;
  private readonly registerOption: Locator;
  private readonly logoutOption: Locator;
  private readonly searchBox: Locator;
  private readonly searchButton: Locator;
  private readonly shoppingCartButton: Locator;
  private readonly myAccountOptionList: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.navigationHeader = this.page.locator("nav#top");
    this.myAccountDropdown = this.navigationHeader.getByRole("button", {
      name: "My Account",
    });
    this.myAccountOptionList =
      this.navigationHeader.locator("ul.dropdown-menu");
    this.loginOption = this.myAccountOptionList.getByRole("link", {
      name: "Login",
    });
    this.registerOption = this.myAccountOptionList.getByRole("link", {
      name: "Register",
    });
    this.searchBox = this.page.getByPlaceholder("Search");
    this.searchButton = this.page.locator(
      "//button[@class='btn btn-light btn-lg']",
    );
    this.shoppingCartButton = this.navigationHeader.getByRole("link", {
      name: "Shopping Cart",
    });
    this.logoutOption = this.navigationHeader.getByRole("link", {
      name: "Logout",
    });
  }

  async verifyHomePageLoaded(): Promise<void> {
    await expect(this.navigationHeader).toBeVisible();
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

  async clickLogoutOption(): Promise<void> {
    await this.logoutOption.click();
  }
}
