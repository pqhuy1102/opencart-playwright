import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  // Variables
  private readonly page: Page;
  private readonly checkoutTitle: Locator;
  private readonly existingAddressDropdown: Locator;
  private readonly chooseShippingMethodButton: Locator;
  private readonly choosePaymentMethodButton: Locator;
  private readonly confirmOrderButton: Locator;
  private readonly shippingMethodModal: Locator;
  private readonly paymentMethodModal: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.checkoutTitle = page.getByRole("heading", {
      name: "Checkout",
    });
    this.existingAddressDropdown = page.locator("#input-shipping-address");
    this.chooseShippingMethodButton = page.locator("#button-shipping-methods");
    this.choosePaymentMethodButton = page.locator("#button-payment-methods");
    this.confirmOrderButton = page.locator("#text-end > .btn");
    this.shippingMethodModal = page.locator("#modal-shipping");
    this.paymentMethodModal = page.locator("#modal-payment");
  }

  // actions
  async isCheckoutPageLoaded(): Promise<boolean> {
    if (await this.checkoutTitle.isVisible()) {
      return true;
    } else {
      return false;
    }
  }

  async selectExistingAddress(address: string): Promise<void> {
    await this.existingAddressDropdown.selectOption({ value: "1" });
  }

  async chooseShippingMethod(): Promise<void> {
    await this.chooseShippingMethodButton.click();
    let flatShipOption = this.shippingMethodModal.getByRole("radio");
    await flatShipOption.check();
    let continueButton = this.shippingMethodModal.getByRole("button", {
      name: "Continue",
    });
    await continueButton.click();
  }

  async choosePaymentMethod(): Promise<void> {
    await this.choosePaymentMethodButton.click();
    let codOption = this.paymentMethodModal.getByRole("radio");
    await codOption.check();
    let continueButton = this.paymentMethodModal.getByRole("button", {
      name: "Continue",
    });
    await continueButton.click();
  }

  async confirmOrder(): Promise<void> {
    await this.confirmOrderButton.click();
  }
}
