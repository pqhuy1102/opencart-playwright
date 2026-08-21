import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ProductCard } from "../pages/ProductCard";
import { SearchResultPage } from "../pages/SearchResultPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { RandomDataGenerator } from "../utils/RandomDataGenerator";
import { AddressData } from "../interface/AddressData";

let config: TestConfig;
let homePage: HomePage;
let registerPage: RegisterPage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let checkoutPage: CheckoutPage;
let searchResultPage: SearchResultPage;
let shoppingCartPage: ShoppingCartPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);
  homePage = new HomePage(page);
  registerPage = new RegisterPage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);
  checkoutPage = new CheckoutPage(page);
  searchResultPage = new SearchResultPage(page);
  shoppingCartPage = new ShoppingCartPage(page);
});

test(
  "E2E: Verify user can register and checkout successfully",
  { tag: ["@e2e", "@regression"] },
  async () => {
    let productName: string = config.productName;
    let firstName: string;
    let lastName: string;

    await test.step("Verify Home Page is loaded", async () => {
      await homePage.verifyHomePageLoaded();
    });

    await test.step("Navigate to Register Page", async () => {
      await homePage.clickMyAccountDropdown();
      await homePage.clickRegisterOption();
      await registerPage.verifyRegisterPageLoaded();
    });

    await test.step("Register a new user", async () => {
      firstName = RandomDataGenerator.generateRandomFirstName();
      lastName = RandomDataGenerator.generateRandomLastName();
      let email = RandomDataGenerator.generateRandomEmail(firstName, lastName);
      let password = RandomDataGenerator.generateRandomPassword();
      await registerPage.inputRegisterForm(
        firstName,
        lastName,
        email,
        password,
      );
      await registerPage.clickPrivacyPolicyToggle();
      await registerPage.submitRegistration();

      expect(await registerPage.getRegisterSuccessMessage()).toContain(
        "Your Account Has Been Created!",
      );
    });

    await test.step("Setup default address", async () => {
      const addressTestData: AddressData = {
        firstName,
        lastName,
        company: config.company,
        address1: config.address1,
        address2: config.address2,
        city: config.city,
        postalCode: config.postalCode,
        country: config.country,
        state: config.state,
        isDefault: true,
      };
      await registerPage.navigateToAccountPage();
      await myAccountPage.verifyMyAccountLoaded();
      await myAccountPage.clickModifyAddressOption();
      await myAccountPage.submit(); // click new address button
      await myAccountPage.inputSetupDefaultAddressForm(addressTestData);
      await myAccountPage.submit(); // submit the address form
      await myAccountPage.verifyAlertSuccessUpdateAddressIsVisible();
    });

    await test.step("Search and add product to cart", async () => {
      await registerPage.searchProduct(productName);
      await searchResultPage.verifySearchResultPageLoaded();
      let productCard: ProductCard = searchResultPage.getProduct();
      await productCard.clickAddToCartButton();
      await productCard.verifyAlertAddedToCartIsVisible();
    });

    await test.step("View shopping cart", async () => {
      await searchResultPage.clickShoppingCartButton();
      await shoppingCartPage.verifyShoppingCartPageLoaded();
      expect(
        await shoppingCartPage.isProductInShoppingCart(productName),
      ).toBeTruthy();
    });

    await test.step("Checkout", async () => {
      await shoppingCartPage.clickCheckoutButton();
      await checkoutPage.verifyCheckoutPageLoaded();
      await checkoutPage.selectExistingAddress();
      await checkoutPage.selectShippingMethod();
      await checkoutPage.selectPaymentMethod();
      await checkoutPage.confirmOrder();
      await checkoutPage.verifyOrderSuccessMessageVisible();
    });
  },
);

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    console.log(`❌ Test failed: ${testInfo.title}`);

    // Example: attach current URL or console errors to the HTML report
    await testInfo.attach("failed-url", {
      body: page.url(),
      contentType: "text/plain",
    });
  }
});
