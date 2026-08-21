import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { RandomDataGenerator } from "../utils/RandomDataGenerator";

let homePage: HomePage;
let registerPage: RegisterPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(`${config.appUrl}`);
  homePage = new HomePage(page);
  registerPage = new RegisterPage(page);
});

test(
  "User registeration with valid credentials",
  { tag: ["@registration", "@smoke"] },
  async () => {
    // Access Homepage
    await homePage.verifyHomePageLoaded();
    await homePage.clickMyAccountDropdown();
    await homePage.clickRegisterOption();

    // Perform register account
    await registerPage.verifyRegisterPageLoaded();
    let firstName = RandomDataGenerator.generateRandomFirstName();
    let lastName = RandomDataGenerator.generateRandomLastName();
    let email = RandomDataGenerator.generateRandomEmail(firstName, lastName);
    let password = RandomDataGenerator.generateRandomPassword();
    await registerPage.inputRegisterForm(firstName, lastName, email, password);
    await registerPage.clickPrivacyPolicyToggle();
    await registerPage.submitRegistration();

    expect(await registerPage.getRegisterSuccessMessage()).toContain(
      "Your Account Has Been Created!",
    );
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
