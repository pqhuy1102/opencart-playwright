# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Login.spec.ts >> Login test with CSV data: Valid login
- Location: tests\Login.spec.ts:94:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/
Call log:
  - navigating to "http://localhost/", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { HomePage } from "../pages/HomePage";
  3   | import { LoginPage } from "../pages/LoginPage";
  4   | import { MyAccountPage } from "../pages/MyAccountPage";
  5   | import { TestConfig } from "../test.config";
  6   | import { DataProvider } from "../utils/DataProvider";
  7   | import { LoginData } from "../interface/LoginData";
  8   | 
  9   | let loginDataCsvPath = "data/logindata.csv";
  10  | let loginDataJsonPath = "data/logindata.json";
  11  | let homePage: HomePage;
  12  | let loginPage: LoginPage;
  13  | let myAccountPage: MyAccountPage;
  14  | let config: TestConfig;
  15  | 
  16  | const loginDataCsv: LoginData[] =
  17  |   DataProvider.getTestDataFromCsv(loginDataCsvPath);
  18  | const loginDataJson: LoginData[] =
  19  |   DataProvider.getTestDataFromJson(loginDataJsonPath);
  20  | 
  21  | test.beforeEach(async ({ page }) => {
  22  |   config = new TestConfig();
> 23  |   await page.goto(`${config.appUrl}`);
      |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/
  24  |   homePage = new HomePage(page);
  25  |   loginPage = new LoginPage(page);
  26  |   myAccountPage = new MyAccountPage(page);
  27  | });
  28  | 
  29  | test(
  30  |   "Login with valid credentials - Config File",
  31  |   { tag: ["@master", "@sanity", "@regression"] },
  32  |   async () => {
  33  |     // Navigate to login page
  34  |     const isHomePageLoaded = await homePage.isHomePageLoaded();
  35  |     expect(isHomePageLoaded).toBeTruthy();
  36  |     await homePage.clickMyAccountDropdown();
  37  |     await homePage.clickLoginOption();
  38  | 
  39  |     // Login page
  40  |     const isLoginPageLoaded = await loginPage.isLoginPageLoaded();
  41  |     expect(isLoginPageLoaded).toBeTruthy();
  42  |     await loginPage.inputLoginForm(config.email, config.password);
  43  |     await loginPage.clickLoginButton();
  44  | 
  45  |     // Navigate to My account page
  46  |     const isMyAccountPageLoaded = await myAccountPage.isMyAccountLoaded();
  47  |     expect(isMyAccountPageLoaded).toBeTruthy();
  48  |   },
  49  | );
  50  | 
  51  | for (const data of loginDataJson) {
  52  |   test(
  53  |     `Login test with JSON data: ${data.testName}`,
  54  |     { tag: ["@master", "@sanity", "@regression", "@jsondata"] },
  55  |     async () => {
  56  |       // Navigate to login page
  57  |       const isHomePageLoaded = await homePage.isHomePageLoaded();
  58  |       expect(isHomePageLoaded).toBeTruthy();
  59  |       await homePage.clickMyAccountDropdown();
  60  |       await homePage.clickLoginOption();
  61  | 
  62  |       // Login page
  63  |       const isLoginPageLoaded = await loginPage.isLoginPageLoaded();
  64  |       expect(isLoginPageLoaded).toBeTruthy();
  65  |       await loginPage.inputLoginForm(data.email, data.password);
  66  |       await loginPage.clickLoginButton();
  67  | 
  68  |       switch (data.expected.toLowerCase()) {
  69  |         case "success":
  70  |           const isMyAccountPageLoaded: boolean =
  71  |             await myAccountPage.isMyAccountLoaded();
  72  |           expect(isMyAccountPageLoaded).toBeTruthy();
  73  |           break;
  74  |         case "loginerror":
  75  |           expect(await loginPage.getLoginErrorMessage()).toContain(
  76  |             "Warning: No match for E-Mail Address and/or Password.",
  77  |           );
  78  |           break;
  79  | 
  80  |         case "emailvalidationerror":
  81  |           expect(await loginPage.getEmailValidationMessage()).toContain(
  82  |             "following '@'",
  83  |           );
  84  |           break;
  85  | 
  86  |         default:
  87  |           throw new Error(`Unknown expected result: ${data.expected}`);
  88  |       }
  89  |     },
  90  |   );
  91  | }
  92  | 
  93  | for (const data of loginDataJson) {
  94  |   test(
  95  |     `Login test with CSV data: ${data.testName}`,
  96  |     { tag: ["@master", "@sanity", "@regression", "@csvdata"] },
  97  |     async () => {
  98  |       // Navigate to login page
  99  |       const isHomePageLoaded = await homePage.isHomePageLoaded();
  100 |       expect(isHomePageLoaded).toBeTruthy();
  101 |       await homePage.clickMyAccountDropdown();
  102 |       await homePage.clickLoginOption();
  103 | 
  104 |       // Login page
  105 |       const isLoginPageLoaded = await loginPage.isLoginPageLoaded();
  106 |       expect(isLoginPageLoaded).toBeTruthy();
  107 |       await loginPage.inputLoginForm(data.email, data.password);
  108 |       await loginPage.clickLoginButton();
  109 | 
  110 |       switch (data.expected.toLowerCase()) {
  111 |         case "success":
  112 |           const isMyAccountPageLoaded: boolean =
  113 |             await myAccountPage.isMyAccountLoaded();
  114 |           expect(isMyAccountPageLoaded).toBeTruthy();
  115 |           break;
  116 |         case "loginerror":
  117 |           expect(await loginPage.getLoginErrorMessage()).toContain(
  118 |             "Warning: No match for E-Mail Address and/or Password.",
  119 |           );
  120 |           break;
  121 | 
  122 |         case "emailvalidationerror":
  123 |           expect(await loginPage.getEmailValidationMessage()).toContain(
```