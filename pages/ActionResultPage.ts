import { Locator, Page } from "@playwright/test";

export class RegisterResultPage {
  // Variables
  private readonly page: Page;
  private readonly registerResultHeading: Locator;
  private readonly logoutResultHeading: Locator;
  private readonly placeOrderResultHeading: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    this.registerResultHeading = this.page.getByRole("heading", {
      name: "Your Account Has Been Created!",
    });
    this.logoutResultHeading = this.page.getByRole("heading", {
      name: "Account Logout",
    });
    this.placeOrderResultHeading = this.page.getByRole("heading", {
      name: "Your order has been placed!",
    });
  }

  // actions
  async isRegisterResultPageLoaded(): Promise<boolean> {
    if (await this.registerResultHeading.isVisible()) {
      return true;
    } else {
      return false;
    }
  }

  async isLogoutResultPageLoaded(): Promise<boolean> {
    if (await this.logoutResultHeading.isVisible()) {
      return true;
    } else {
      return false;
    }
  }

  async isPlaceOrderResultPageLoaded(): Promise<boolean> {
    if (await this.placeOrderResultHeading.isVisible()) {
      return true;
    } else {
      return false;
    }
  }
}
