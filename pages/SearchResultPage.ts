import { Page, Locator, expect } from "@playwright/test";
import { ProductCard } from "./ProductCard";

export class SearchResultPage {
  // Variables
  private readonly page: Page;
  private readonly searchResultHeading: Locator;
  private readonly productCards: Locator;
  private readonly navigationHeader: Locator;
  private readonly shoppingCartButton: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    this.searchResultHeading = this.page.getByRole("heading", {
      name: "Products meeting the search criteria",
    });
    this.productCards = this.page.locator(".product-thumb");
    this.navigationHeader = this.page.locator("nav#top");
    this.shoppingCartButton = this.navigationHeader.getByRole("link", {
      name: "Shopping Cart",
    });
  }

  // actions
  async verifySearchResultPageLoaded(): Promise<void> {
    await expect(this.searchResultHeading).toBeVisible();
  }

  getProduct(): ProductCard {
    const productCard = this.productCards.first();
    return new ProductCard(productCard);
  }

  async clickShoppingCartButton(): Promise<void> {
    await this.shoppingCartButton.click();
  }
}
