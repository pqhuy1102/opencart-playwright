import { Locator, expect } from "@playwright/test";

export class ProductCard {
  // Variables
  private readonly card: Locator;
  private readonly addToCartButton: Locator;
  private readonly alertAddedToCart: Locator;

  // constructor
  constructor(card: Locator) {
    this.card = card;
    this.addToCartButton = card.locator("button[formaction*='cart.add']");

    this.alertAddedToCart = card.page().locator(".alert.alert-success");
  }

  async clickAddToCartButton(): Promise<void> {
    await this.addToCartButton.click();
  }

  async verifyAlertAddedToCartIsVisible(): Promise<void> {
    await expect(this.alertAddedToCart).toBeVisible();
  }
}
