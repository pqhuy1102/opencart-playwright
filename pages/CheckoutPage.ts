import { Page, Locator, expect } from "@playwright/test";

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
  private readonly orderSuccessMessage: Locator;
  private readonly shippingContinueButton: Locator;
  private readonly paymentContinueButton: Locator;
  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.checkoutTitle = page.getByRole("heading", {
      name: "Checkout",
    });
    this.existingAddressDropdown = page.locator("#input-shipping-address");
    this.chooseShippingMethodButton = page.locator("#button-shipping-methods");
    this.choosePaymentMethodButton = page.locator("#button-payment-methods");
    this.confirmOrderButton = this.page.locator(
      "#button-confirm, #checkout-confirm button, button:has-text('Confirm Order')",
    );
    this.shippingMethodModal = page.locator("#modal-shipping .modal-body");
    this.paymentMethodModal = page.locator("#modal-payment .modal-body");
    this.orderSuccessMessage = this.page.getByRole("heading", {
      name: "Your order has been placed!",
    });
    this.shippingContinueButton = this.shippingMethodModal.locator(
      "#button-shipping-method",
    );
    this.paymentContinueButton = this.paymentMethodModal.locator(
      "#button-payment-method",
    );
  }

  // actions
  async verifyCheckoutPageLoaded(): Promise<void> {
    await expect(this.checkoutTitle).toBeVisible();
  }

  async selectExistingAddress(): Promise<void> {
    await this.existingAddressDropdown.selectOption({ index: 1 });
  }

  async clickShippingMethodButton(): Promise<void> {
    await this.chooseShippingMethodButton.click();
  }

  async clickPaymentMethodButton(): Promise<void> {
    await this.choosePaymentMethodButton.click();
  }

  async chooseShippingMethod(): Promise<void> {
    const flatShipOption = this.shippingMethodModal.getByRole("radio");
    await flatShipOption.click();

    await Promise.all([
      this.page.waitForResponse(
        (res) =>
          res.url().includes("route=checkout/shipping_method.save") &&
          res.status() === 200,
      ),
      this.shippingContinueButton.click(),
    ]);
  }

  async choosePaymentMethod(): Promise<void> {
    const codOption = this.paymentMethodModal.getByRole("radio");
    await codOption.click();

    await Promise.all([
      this.page.waitForResponse(
        (res) =>
          res.url().includes("route=checkout/payment_method.save") &&
          res.status() === 200,
      ),
      this.paymentContinueButton.click(),
    ]);
  }

  async confirmOrder(): Promise<void> {
    await expect(this.confirmOrderButton).toBeEnabled();
    await this.confirmOrderButton.click();
  }

  async verifyOrderSuccessMessageVisible(): Promise<void> {
    await expect(this.orderSuccessMessage).toBeVisible();
  }
}
