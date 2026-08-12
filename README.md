# OpenCart UI Automation Testing

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)
![Allure Report](https://img.shields.io/badge/Allure-Report-orange)
![Page Object Model](https://img.shields.io/badge/Design%20Pattern-POM-blue)

Automated UI testing framework for **OpenCart** built with **Playwright and TypeScript**, following the **Page Object Model (POM)** design pattern.

The project is designed to provide a scalable, maintainable, and reliable automation framework for testing critical OpenCart e-commerce functionalities.

---

## 📌 Project Overview

This project automates end-to-end UI test scenarios for the OpenCart application.

### Objectives

* Automate critical user journeys.
* Reduce manual regression testing effort.
* Improve test reliability and maintainability.
* Apply **Page Object Model (POM)** for better code organization.
* Generate detailed test execution reports using **Allure Report**.
* Support test filtering using **Playwright tags**.
* Provide a foundation for CI/CD integration.

### Application Under Test

**OpenCart** is an open-source e-commerce platform used to demonstrate and validate automated testing scenarios.

---

## 🛠️ Tech Stack

| Technology            | Purpose                            |
| --------------------- | ---------------------------------- |
| **Playwright**        | Browser automation and E2E testing |
| **TypeScript**        | Programming language               |
| **Node.js**           | Runtime environment                |
| **Page Object Model** | Test architecture/design pattern   |
| **Allure Report**     | Test execution reporting           |
| **Git / GitHub**      | Source control                     |
| **GitHub Actions**    | CI/CD automation                   |

---

## 🏗️ Framework Architecture

The framework follows the **Page Object Model (POM)** pattern.

```text
Test Case
   │
   ▼
Page Object
   │
   ▼
Locator / Action
   │
   ▼
OpenCart Application
```

Tests are responsible for defining **what should be tested**, while Page Objects contain **how the application should be interacted with**.

### Example

```typescript
test("User can login successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
        username,
        password
    );

    await expect(
        loginPage.accountHeading
    ).toBeVisible();
});
```

The test does not need to know how the username/password fields are located.

That logic is encapsulated inside `LoginPage`.

---

## 📂 Project Structure

```text
opencart-playwright/
│
├── tests/
│   ├── login.spec.ts
│   ├── register.spec.ts
│   ├── product.spec.ts
│   ├── checkout.spec.ts
│   └── ...
│
├── pages/
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── HomePage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ...
│
├── testdata/
│   ├── users.json
│   ├── products.json
│   └── ...
│
├── utils/
│   ├── testData.ts
│   └── helpers.ts
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

### Directory Responsibilities

#### `tests/`

Contains test specifications.

```text
tests/
├── login.spec.ts
├── register.spec.ts
└── checkout.spec.ts
```

Tests should focus on:

* Test scenarios
* Test data
* Assertions
* Business flows

---

#### `pages/`

Contains Page Object classes.

Example:

```typescript
export class LoginPage {
    constructor(private page: Page) {}

    usernameInput = this.page.getByLabel("E-Mail Address");
    passwordInput = this.page.getByLabel("Password");
    loginButton = this.page.getByRole("button", {
        name: "Login"
    });

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
```

The Page Object is responsible for:

* Locators
* Page actions
* Reusable page-level methods

---

#### `testdata/`

Stores external test data.

Example:

```json
{
    "validUser": {
        "username": "test@example.com",
        "password": "Password123"
    }
}
```

Separating test data from test logic makes tests easier to maintain.

---

#### `utils/`

Contains reusable helper functions.

Examples:

* Test data generators
* Common utilities
* Custom helper methods
* Shared functions

---

## ⚙️ Installation

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

Verify installation:

```bash
node --version
npm --version
git --version
```

---

### Clone Repository

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd opencart-playwright
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

For Linux/CI environments:

```bash
npx playwright install --with-deps
```

---

## ▶️ Running Tests

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/login.spec.ts
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run a specific browser

```bash
npx playwright test --project=chromium
```

### Run tests using UI mode

```bash
npx playwright test --ui
```

---

## 🏷️ Test Tags

Tests can be categorized using tags.

Example:

```typescript
test(
    "User can login successfully @smoke",
    async ({ page }) => {
        // test steps
    }
);
```

### Run smoke tests

```bash
npx playwright test --grep "@smoke"
```

### Run regression tests

```bash
npx playwright test --grep "@regression"
```

### Exclude a tag

```bash
npx playwright test --grep-invert "@regression"
```

### Run tests containing multiple tags

For example, run tests containing both `@sanity` and `@regression`:

```bash
npx playwright test \
    --grep "(?=.*@sanity)(?=.*@regression)"
```

---

# 📊 Allure Report

This project uses **Allure Report** to provide detailed and user-friendly test execution reports.

Allure provides information such as:

* Test results
* Test steps
* Execution duration
* Passed / failed tests
* Screenshots
* Traces
* Error details
* Test categorization

---

## Generate Allure Report

After running tests:

```bash
npx allure generate allure-results --clean
```

Open the generated report:

```bash
npx allure open allure-report
```

Alternatively, if the project has the appropriate npm script:

```bash
npm run allure:generate
npm run allure:open
```

---

## 📸 Test Artifacts

Playwright can capture useful debugging artifacts when tests fail.

Depending on the configuration, the project can collect:

* Screenshots
* Videos
* Trace files
* HTML report
* Allure results

Example configuration:

```typescript
use: {
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
}
```

This makes debugging failed tests significantly easier.

---

# 🧪 Testing Scope

The automation suite covers major OpenCart functionalities.

### Authentication

* Login with valid credentials
* Login with invalid credentials
* Logout
* Authentication validation

### Registration

* Register new account
* Required field validation
* Invalid email validation
* Password confirmation validation

### Product

* Search product
* View product details
* Validate product information
* Add product to cart

### Shopping Cart

* Add product
* Remove product
* Update quantity
* Validate cart total

### Checkout

* Shipping address
* Shipping method
* Payment method
* Order confirmation

### Regression

Critical business flows are grouped into regression tests to ensure existing functionality remains stable after changes.

---

# 🧩 Example Test

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login", () => {

    test("User can login successfully @smoke", async ({ page }) => {

        const loginPage = new LoginPage(page);

        await page.goto("/index.php?route=account/login");

        await loginPage.login(
            "test@example.com",
            "Password123"
        );

        await expect(
            page.getByRole("heading", {
                name: "My Account"
            })
        ).toBeVisible();
    });

});
```

---

# 🧱 Page Object Example

```typescript
import { Page, Locator } from "@playwright/test";

export class LoginPage {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(private page: Page) {

        this.usernameInput =
            page.getByLabel("E-Mail Address");

        this.passwordInput =
            page.getByLabel("Password");

        this.loginButton =
            page.getByRole("button", {
                name: "Login"
            });
    }

    async login(
        username: string,
        password: string
    ) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
```

### Benefits

Using POM provides:

* Reusable locators
* Reusable actions
* Reduced code duplication
* Easier maintenance
* Better test readability
* Clear separation between test logic and UI implementation

---

# ⚙️ Playwright Configuration

The main configuration is located in:

```text
playwright.config.ts
```

Example:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({

    testDir: "./tests",

    timeout: 30_000,

    expect: {
        timeout: 5_000,
    },

    fullyParallel: true,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ["html"],
        ["allure-playwright"],
        ["list"]
    ],

    use: {
        baseURL: "http://localhost",

        trace: "retain-on-failure",

        screenshot: "only-on-failure",

        video: "retain-on-failure",

        headless: true,
    },

    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
            },
        },
    ],
});
```

---

# 🔄 Test Execution Flow

```text
Developer
    │
    ▼
Write / Update Test
    │
    ▼
Page Object
    │
    ▼
Playwright
    │
    ▼
OpenCart
    │
    ▼
Assertions
    │
    ├── PASS ──► Allure Report
    │
    └── FAIL ──► Screenshot / Video / Trace
                         │
                         ▼
                   Debugging
```

---

# 🚀 CI/CD

The project can be integrated with **GitHub Actions** to automatically execute tests when code is pushed or a Pull Request is created.

Example workflow:

```text
Developer
    │
    ▼
Git Push / Pull Request
    │
    ▼
GitHub Actions
    │
    ├── Checkout Repository
    │
    ├── Setup Node.js
    │
    ├── npm install
    │
    ├── Install Playwright
    │
    ├── Run Tests
    │
    └── Generate Test Results
             │
             ▼
        Allure Report
```

Example workflow file:

```text
.github/
└── workflows/
    └── playwright.yml
```

---

# 📈 Test Strategy

The automation framework follows a layered testing approach.

### Smoke Tests

Used to verify that the most critical functionality is working.

Example:

```text
Login
Registration
Search
Add to Cart
Checkout
```

### Sanity Tests

Used to verify specific functionality after a change or fix.

### Regression Tests

Used to verify that existing functionality has not been broken by new changes.

---

# 🎯 Best Practices

### 1. Prefer user-facing locators

Prefer:

```typescript
page.getByRole("button", { name: "Login" });
```

over:

```typescript
page.locator("#login-button");
```

when both are reliable.

---

### 2. Keep locators inside Page Objects

Avoid:

```typescript
test("Login", async ({ page }) => {

    await page.locator("#input-email").fill("test@example.com");

});
```

Prefer:

```typescript
const loginPage = new LoginPage(page);

await loginPage.login(
    username,
    password
);
```

---

### 3. Keep tests readable

A test should describe the business scenario rather than implementation details.

Good:

```typescript
await loginPage.login(username, password);

await expect(accountPage.accountHeading)
    .toBeVisible();
```

Avoid putting complex locator logic directly inside the test.

---

### 4. Avoid hard waits

Avoid:

```typescript
await page.waitForTimeout(3000);
```

Prefer Playwright's auto-waiting and web-first assertions:

```typescript
await expect(
    page.getByRole("heading", {
        name: "My Account"
    })
).toBeVisible();
```

---

### 5. Use reusable test data

Avoid hardcoding the same data repeatedly.

Instead:

```typescript
const user = testData.validUser;

await loginPage.login(
    user.email,
    user.password
);
```

---

### 6. Keep Page Objects focused

A Page Object should represent a page/component and its behavior.

Avoid creating one huge Page Object containing the entire application.

---

# 🐛 Debugging

### Debug mode

```bash
npx playwright test --debug
```

### Show test report

```bash
npx playwright show-report
```

### View trace

```bash
npx playwright show-trace test-results/<trace-file>.zip
```

Trace Viewer can help investigate:

* Failed actions
* Network requests
* DOM snapshots
* Screenshots
* Timing
* Locator behavior

---

# 📋 Example NPM Scripts

Recommended `package.json` scripts:

```json
{
    "scripts": {
        "test": "playwright test",
        "test:headed": "playwright test --headed",
        "test:ui": "playwright test --ui",
        "test:smoke": "playwright test --grep @smoke",
        "test:regression": "playwright test --grep @regression",
        "report": "playwright show-report",
        "allure:generate": "allure generate allure-results --clean",
        "allure:open": "allure open allure-report"
    }
}
```

Then tests can be executed more conveniently:

```bash
npm run test
```

```bash
npm run test:smoke
```

```bash
npm run test:regression
```

```bash
npm run allure:generate
```

---

# 🔐 Environment Configuration

Environment-specific configuration should not be hardcoded inside test cases.

For example:

```text
.env
.env.dev
.env.staging
```

Example:

```env
BASE_URL=http://localhost
TEST_USERNAME=test@example.com
TEST_PASSWORD=Password123
```

Sensitive information should **never be committed to Git**.

Add environment files to `.gitignore`:

```gitignore
.env
.env.*
!.env.example
```

Provide an example configuration:

```text
.env.example
```

---

# 👨‍💻 Author

**Pham Quoc Huy**

Quality Engineer | QA Automation

### Focus Areas

* Manual Testing
* Automation Testing
* Playwright
* TypeScript
* API Testing
* CI/CD
* Test Framework Design

---

# 📄 License

This project is created for **learning, automation testing practice, and portfolio purposes**.
