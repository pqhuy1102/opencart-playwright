import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { TestConfig } from "../test.config";

let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(`${config.appUrl}`);
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);
});

test(
  "Login with valid credentials",
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

test.afterEach(async ({ page }) => {
  await page.close();
});
