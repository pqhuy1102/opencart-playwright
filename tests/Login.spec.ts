import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { TestConfig } from "../test.config";
import { DataProvider } from "../utils/DataProvider";
import { LoginData } from "../interface/LoginData";

let loginDataCsvPath = "data/logindata.csv";
let loginDataJsonPath = "data/logindata.json";
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
  { tag: ["@master", "@sanity", "@regression"] },
  async () => {
    // Navigate to login page
    const isHomePageLoaded = await homePage.isHomePageLoaded();
    expect(isHomePageLoaded).toBeTruthy();
    await homePage.clickMyAccountDropdown();
    await homePage.clickLoginOption();

    // Login page
    const isLoginPageLoaded = await loginPage.isLoginPageLoaded();
    expect(isLoginPageLoaded).toBeTruthy();
    await loginPage.inputLoginForm(config.email, config.password);
    await loginPage.clickLoginButton();

    // Navigate to My account page
    const isMyAccountPageLoaded = await myAccountPage.isMyAccountLoaded();
    expect(isMyAccountPageLoaded).toBeTruthy();
  },
);

for (const data of loginDataJson) {
  test(
    `Login test with JSON data: ${data.testName}`,
    { tag: ["@master", "@sanity", "@regression", "@jsondata"] },
    async () => {
      // Navigate to login page
      const isHomePageLoaded = await homePage.isHomePageLoaded();
      expect(isHomePageLoaded).toBeTruthy();
      await homePage.clickMyAccountDropdown();
      await homePage.clickLoginOption();

      // Login page
      const isLoginPageLoaded = await loginPage.isLoginPageLoaded();
      expect(isLoginPageLoaded).toBeTruthy();
      await loginPage.inputLoginForm(data.email, data.password);
      await loginPage.clickLoginButton();

      switch (data.expected.toLowerCase()) {
        case "success":
          const isMyAccountPageLoaded: boolean =
            await myAccountPage.isMyAccountLoaded();
          expect(isMyAccountPageLoaded).toBeTruthy();
          break;
        case "loginerror":
          expect(await loginPage.getLoginErrorMessage()).toContain(
            " Warning: No match for E-Mail Address and/or Password.",
          );
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

for (const data of loginDataJson) {
  test(
    `Login test with CSV data: ${data.testName}`,
    { tag: ["@master", "@sanity", "@regression", "@csvdata"] },
    async () => {
      // Navigate to login page
      const isHomePageLoaded = await homePage.isHomePageLoaded();
      expect(isHomePageLoaded).toBeTruthy();
      await homePage.clickMyAccountDropdown();
      await homePage.clickLoginOption();

      // Login page
      const isLoginPageLoaded = await loginPage.isLoginPageLoaded();
      expect(isLoginPageLoaded).toBeTruthy();
      await loginPage.inputLoginForm(data.email, data.password);
      await loginPage.clickLoginButton();

      switch (data.expected.toLowerCase()) {
        case "success":
          const isMyAccountPageLoaded: boolean =
            await myAccountPage.isMyAccountLoaded();
          expect(isMyAccountPageLoaded).toBeTruthy();
          break;
        case "loginerror":
          expect(await loginPage.getLoginErrorMessage()).toContain(
            " Warning: No match for E-Mail Address and/or Password.",
          );
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

test.afterEach(async ({ page }) => {
  await page.close();
});
