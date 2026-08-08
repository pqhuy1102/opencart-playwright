import { Page, Locator } from "@playwright/test";

export class ProductCard {
  // Variables
  private readonly productName: Locator;
  private readonly addToCartButton: Locator;
  private readonly wishlistButton: Locator;
  private readonly compareButton: Locator;
  private readonly alertAddedToCart: Locator;

  // constructor
  constructor(private readonly productCard: Locator) {
    this.productName = productCard.getByRole("link");
    this.addToCartButton = productCard.getByRole("button", {
      name: "Add to Cart",
    });
    this.wishlistButton = productCard.getByRole("button", {
      name: "Add to Wish List",
    });
    this.compareButton = productCard.getByRole("button", {
      name: "Compare this Product",
    });
    this.alertAddedToCart = productCard.locator(".alert.alert-success");
  }

  async getProductName(): Promise<string> {
    return await this.productName.innerText();
  }

  async clickAddToCartButton(): Promise<void> {
    await this.addToCartButton.click();
  }

  async clickWishlistButton(): Promise<void> {
    await this.wishlistButton.click();
  }

  async clickCompareButton(): Promise<void> {
    await this.compareButton.click();
  }

  async isAlertAddedToCartVisible(): Promise<boolean> {
    if (await this.alertAddedToCart.isVisible()) {
      return true;
    } else {
      return false;
    }
  }
}
