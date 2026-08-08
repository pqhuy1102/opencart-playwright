import { Locator, Page } from "@playwright/test";

export class ShoppingCartPage {
  // Variables
  private readonly page: Page;
  private readonly shoppingCartTitle: Locator;
  private readonly productTable: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.shoppingCartTitle = page.getByRole("heading", {
      name: "Shopping Cart",
    });
    this.productTable = page.locator(".table > tbody");
  }

  // actions
  async isShoppingCartPageLoaded(): Promise<boolean> {
    if (await this.shoppingCartTitle.isVisible()) {
      return true;
    } else {
      return false;
    }
  }

  async isProductInShoppingCart(productName: string): Promise<boolean> {
    const productRow = this.productTable
      .locator("tr")
      .filter({ hasText: productName });
    return (await productRow.count()) > 0;
  }
}
