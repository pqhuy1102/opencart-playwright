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
    this.confirmOrderButton = this.page.locator("#button-confirm");
    this.shippingMethodModal = page.locator("#modal-shipping");
    this.paymentMethodModal = page.locator("#modal-payment");
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

  private async clickContinueAndVerifySaved(
    continueButton: Locator,
    saveRouteFragment: string,
  ): Promise<void> {
    const [saveResponse] = await Promise.all([
      this.page.waitForResponse(
        (res) => res.url().includes(saveRouteFragment) && res.status() === 200,
      ),
      continueButton.click(),
    ]);

    const body = await saveResponse.json();
    expect(
      body.error,
      `${saveRouteFragment} return error: ${JSON.stringify(body.error)}`,
    ).toBeUndefined();
  }

  async verifyCheckoutPageLoaded(): Promise<void> {
    await expect(this.checkoutTitle).toBeVisible();
  }

  private async waitForAjaxIdle(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const jquery = (window as any).jQuery;

        return jquery && jquery.active === 0;
      },
      undefined,
      {
        timeout: 15000,
      },
    );
  }

  async selectExistingAddress(): Promise<void> {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes("route=checkout/shipping_address.address") &&
        response.status() === 200,
    );

    await this.existingAddressDropdown.selectOption({
      index: 1,
    });

    const response = await responsePromise;
    const body = await response.json();

    expect(body.error).toBeUndefined();
    expect(body.success).toBeTruthy();

    await this.waitForAjaxIdle();
  }

  async selectShippingMethod(): Promise<void> {
    await this.chooseShippingMethodButton.click();

    await expect(this.shippingMethodModal).toBeVisible();

    const shippingOption = this.shippingMethodModal.getByRole("radio").first();

    await shippingOption.check();

    await expect(shippingOption).toBeChecked();

    await this.clickContinueAndVerifySaved(
      this.shippingContinueButton,
      "route=checkout/shipping_method.save",
    );

    await this.waitForAjaxIdle();

    await expect(this.shippingMethodModal).toBeHidden();
  }

  async selectPaymentMethod(): Promise<void> {
    await this.choosePaymentMethodButton.click();

    await expect(this.paymentMethodModal).toBeVisible();

    const paymentOption = this.paymentMethodModal.getByRole("radio").first();

    await paymentOption.check();

    await expect(paymentOption).toBeChecked();

    await this.clickContinueAndVerifySaved(
      this.paymentContinueButton,
      "route=checkout/payment_method.save",
    );

    await this.waitForAjaxIdle();

    await expect(this.paymentMethodModal).toBeHidden();

    await expect(this.confirmOrderButton).toBeEnabled({
      timeout: 15000,
    });
  }

  async confirmOrder(): Promise<void> {
    await this.confirmOrderButton.click();
  }

  async verifyOrderSuccessMessageVisible(): Promise<void> {
    await expect(this.orderSuccessMessage).toBeVisible();
  }
}
