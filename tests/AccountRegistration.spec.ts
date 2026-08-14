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
  { tag: ["@registration", "@sanity", "@regression"] },
  async () => {
    // Access Homepage
    const isHomePageLoaded = await homePage.isHomePageLoaded();
    expect(isHomePageLoaded).toBeTruthy();
    await homePage.clickMyAccountDropdown();
    await homePage.clickRegisterOption();

    // Perform register account
    const isRegisterPageLoaded = await registerPage.isRegisterPageLoaded();
    expect(isRegisterPageLoaded).toBeTruthy();
    let firstName = RandomDataGenerator.generateRandomFirstName();
    let lastName = RandomDataGenerator.generateRandomLastName();
    let email = RandomDataGenerator.generateRandomEmail(firstName, lastName);
    let password = RandomDataGenerator.generateRandomPassword();
    await registerPage.inputRegisterForm(firstName, lastName, email, password);
    await registerPage.clickPrivacyPolicyToggle();
    await registerPage.clickContinueButton();

    expect(await registerPage.getRegisterSuccessMessage()).toContain(
      "Your Account Has Been Created!",
    );
  },
);

test.afterEach(async ({ page }) => {
  await page.close();
});
