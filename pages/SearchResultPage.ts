import { Page, Locator } from "@playwright/test";
import { ProductCard } from "./ProductCard";

export class SearchResultPage {
  // Variables
  private readonly page: Page;
  private readonly searchResultHeading: Locator;
  private readonly productCards: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    this.searchResultHeading = this.page.getByRole("heading", {
      name: "Products meeting the search criteria",
    });
    this.productCards = this.page.locator(".product-thumb");
  }

  // actions
  async isSearchResultPageLoaded(): Promise<boolean> {
    if (await this.searchResultHeading.isVisible()) {
      return true;
    } else {
      return false;
    }
  }

  getProduct(name: string): ProductCard {
    const productCard = this.productCards.filter({ hasText: name });
    return new ProductCard(productCard);
  }
}
