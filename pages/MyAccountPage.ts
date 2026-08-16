import { Page, Locator, expect } from "@playwright/test";
import { AddressData } from "../interface/AddressData";

export class MyAccountPage {
  // Variables
  private readonly page: Page;
  private readonly loginOption: Locator;
  private readonly registerOption: Locator;
  private readonly pageContent: Locator;
  private readonly myAccountHeading: Locator;
  private readonly modifyAddressOption: Locator;
  private readonly continueButton: Locator;
  // setup default address form
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly companyInput: Locator;
  private readonly address1Input: Locator;
  private readonly address2Input: Locator;
  private readonly cityInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly countryDropdown: Locator;
  private readonly stateDropdown: Locator;
  private readonly defaultAddressRadioButton: Locator;
  private readonly addressTable: Locator;
  private readonly alertSuccess: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.pageContent = this.page.locator("div#content");
    this.myAccountHeading = this.pageContent.locator("h1");
    this.modifyAddressOption = this.pageContent.getByText(
      "Modify your address book entries",
    );
    this.loginOption = this.page.getByText("Login");
    this.registerOption = this.page.getByText("Register");
    this.continueButton = this.page.locator(".text-end .btn-primary");
    // setup default address form
    this.firstNameInput = this.page.locator("#input-firstname");
    this.lastNameInput = this.page.locator("#input-lastname");
    this.companyInput = this.page.locator("#input-company");
    this.address1Input = this.page.locator("#input-address-1");
    this.address2Input = this.page.locator("#input-address-2");
    this.cityInput = this.page.locator("#input-city");
    this.postalCodeInput = this.page.locator("#input-postcode");
    this.countryDropdown = this.page.locator("#input-country");
    this.stateDropdown = this.page.locator("#input-zone");
    this.defaultAddressRadioButton = this.page.locator("#input-default-yes");
    this.addressTable = this.page.locator("#address .table tbody");
    this.alertSuccess = this.page.locator(".alert.alert-success");
  }

  // Actions

  async verifyMyAccountLoaded(): Promise<void> {
    await expect(this.myAccountHeading).toHaveText("My Account");
  }

  async clickLoginOption(): Promise<void> {
    await this.loginOption.click();
  }

  async clickRegisterOption(): Promise<void> {
    await this.registerOption.click();
  }

  async clickModifyAddressOption(): Promise<void> {
    await this.modifyAddressOption.click();
  }

  async submit(): Promise<void> {
    await this.continueButton.click();
  }

  async inputSetupDefaultAddressForm(addressData: AddressData): Promise<void> {
    await this.firstNameInput.fill(addressData.firstName);
    await this.lastNameInput.fill(addressData.lastName);
    if (addressData.company) {
      await this.companyInput.fill(addressData.company);
    }
    await this.address1Input.fill(addressData.address1);
    if (addressData.address2) {
      await this.address2Input.fill(addressData.address2);
    }
    await this.cityInput.fill(addressData.city);
    await this.postalCodeInput.fill(addressData.postalCode);
    await this.countryDropdown.selectOption({ value: addressData.country });
    await this.stateDropdown.selectOption({ value: addressData.state });
    if (addressData.isDefault) {
      await this.defaultAddressRadioButton.check();
    }
  }

  async verifyAlertSuccessUpdateAddressIsVisible(): Promise<void> {
    await expect(this.alertSuccess).toBeVisible();
  }

  async isDefaultAddressAlreadySet(): Promise<boolean> {
    const addressTableRows = await this.addressTable.locator("tr").all();
    for (const row of addressTableRows) {
      const addressText = await row.textContent();
      if (addressText?.includes("Default")) {
        return true;
      }
    }
    return false;
  }
}
