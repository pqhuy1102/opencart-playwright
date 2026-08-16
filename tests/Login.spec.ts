import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { TestConfig } from "../test.config";
import { DataProvider } from "../utils/DataProvider";
import { LoginData } from "../interface/LoginData";

let loginDataCsvPath = "test-data/logindata.csv";
let loginDataJsonPath = "test-data/logindata.json";
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let config: TestConfig;

const loginDataCsv: LoginData[] =
  DataProvider.getTestDataFromCsv(loginDataCsvPath);
const loginDataJson: LoginData[] =
  DataProvider.getTestDataFromJson(loginDataJsonPath);

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(`${config.appUrl}`);
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);
});

test(
  "Login with valid credentials - Config File",
  { tag: ["@login", "@sanity", "@regression"] },
  async () => {
    // Navigate to login page
    await homePage.verifyHomePageLoaded();
    await homePage.clickMyAccountDropdown();
    await homePage.clickLoginOption();

    // Login page
    await loginPage.verifyLoginPageLoaded();
    await loginPage.inputLoginForm(config.email, config.password);
    await loginPage.clickLoginButton();

    // Navigate to My account page
    await myAccountPage.verifyMyAccountLoaded();
  },
);

for (const data of loginDataJson) {
  test(
    `Login test with JSON data: ${data.testName}`,
    { tag: ["@login", "@sanity", "@regression", "@jsondata"] },
    async () => {
      // Navigate to login page
      await homePage.verifyHomePageLoaded();
      await homePage.clickMyAccountDropdown();
      await homePage.clickLoginOption();

      // Login page
      await loginPage.verifyLoginPageLoaded();
      await loginPage.inputLoginForm(data.email, data.password);
      await loginPage.clickLoginButton();

      switch (data.expected.toLowerCase()) {
        case "success":
          await myAccountPage.verifyMyAccountLoaded();
          break;
        case "loginerror":
          expect(await loginPage.getLoginErrorMessage()).toContain(" Warning");
          break;

        case "emailvalidationerror":
          expect(await loginPage.getEmailValidationMessage()).toContain(
            "following '@'",
          );
          break;

        default:
          throw new Error(`Unknown expected result: ${data.expected}`);
      }
    },
  );
}

for (const data of loginDataCsv) {
  test(
    `Login test with CSV data: ${data.testName}`,
    { tag: ["@login", "@sanity", "@regression", "@csvdata"] },
    async () => {
      // Navigate to login page
      await homePage.verifyHomePageLoaded();
      await homePage.clickMyAccountDropdown();
      await homePage.clickLoginOption();

      // Login page
      await loginPage.verifyLoginPageLoaded();
      await loginPage.inputLoginForm(data.email, data.password);
      await loginPage.clickLoginButton();

      switch (data.expected.toLowerCase()) {
        case "success":
          await myAccountPage.verifyMyAccountLoaded();
          break;
        case "loginerror":
          expect(await loginPage.getLoginErrorMessage()).toContain(" Warning");
          break;

        case "emailvalidationerror":
          expect(await loginPage.getEmailValidationMessage()).toContain(
            "following '@'",
          );
          break;

        default:
          throw new Error(`Unknown expected result: ${data.expected}`);
      }
    },
  );
}

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
