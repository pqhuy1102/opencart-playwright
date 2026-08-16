import { Locator, Page, expect } from "@playwright/test";

export class ShoppingCartPage {
  // Variables
  private readonly page: Page;
  private readonly shoppingCartTitle: Locator;
  private readonly productTable: Locator;
  private readonly checkoutButton: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.shoppingCartTitle = this.page.getByRole("heading", {
      name: "Shopping Cart",
    });
    this.productTable = this.page.locator(".table > tbody");
    this.checkoutButton = this.page.locator("a.btn.btn-primary");
  }

  // actions
  async verifyShoppingCartPageLoaded(): Promise<void> {
    await expect(this.shoppingCartTitle).toBeVisible();
  }

  async isProductInShoppingCart(productName: string): Promise<boolean> {
    const productRow = this.productTable
      .locator("tr")
      .filter({ hasText: productName });
    return (await productRow.count()) > 0;
  }

  async clickCheckoutButton(): Promise<void> {
    await this.checkoutButton.click();
  }
}
