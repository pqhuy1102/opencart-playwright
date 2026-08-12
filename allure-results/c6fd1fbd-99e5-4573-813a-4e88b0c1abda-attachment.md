# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AccountRegistration.spec.ts >> User registeration with valid credentials
- Location: tests\AccountRegistration.spec.ts:8:5

# Error details

```
Error: expect(received).resolves.toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=f1e1]:
  - navigation [ref=f1e2]:
    - generic [ref=f1e4]:
      - list [ref=f1e6]:
        - listitem [ref=f1e7]:
          - link "$ Currency " [ref=f1e10] [cursor=pointer]:
            - /url: "#"
            - strong [ref=f1e11]: $
            - text: Currency
            - generic [ref=f1e12]: 
        - listitem
      - list [ref=f1e14]:
        - listitem [ref=f1e15]:
          - link " 123456789" [ref=f1e16] [cursor=pointer]:
            - /url: http://localhost/index.php?route=information/contact&language=en-gb
            - generic [ref=f1e17]: 
            - text: "123456789"
        - listitem [ref=f1e18]:
          - link " My Account " [ref=f1e20] [cursor=pointer]:
            - /url: "#"
            - generic [ref=f1e21]: 
            - text: My Account
            - generic [ref=f1e22]: 
        - listitem [ref=f1e23]:
          - link " Wish List (0)" [ref=f1e24] [cursor=pointer]:
            - /url: http://localhost/index.php?route=account/wishlist&language=en-gb
            - generic [ref=f1e25]: 
            - text: Wish List (0)
        - listitem [ref=f1e26]:
          - link " Shopping Cart" [ref=f1e27] [cursor=pointer]:
            - /url: http://localhost/index.php?route=checkout/cart&language=en-gb
            - generic [ref=f1e28]: 
            - text: Shopping Cart
        - listitem [ref=f1e29]:
          - link " Checkout" [ref=f1e30] [cursor=pointer]:
            - /url: http://localhost/index.php?route=checkout/checkout&language=en-gb
            - generic [ref=f1e31]: 
            - text: Checkout
  - banner [ref=f1e32]:
    - generic [ref=f1e34]:
      - link [ref=f1e37] [cursor=pointer]:
        - /url: http://localhost/index.php?route=common/home&language=en-gb
        - img "Your Store" [ref=f1e38]
      - generic [ref=f1e40]:
        - textbox "Search" [ref=f1e41]
        - button "" [ref=f1e42] [cursor=pointer]
      - button " 0 item(s) - $0.00" [ref=f1e46] [cursor=pointer]:
        - generic [ref=f1e47]: 
        - text: 0 item(s) - $0.00
  - main [ref=f1e48]:
    - navigation [ref=f1e50]:
      - text: 
      - list [ref=f1e52]:
        - listitem [ref=f1e53]:
          - link "Desktops" [ref=f1e54] [cursor=pointer]:
            - /url: http://localhost/index.php?route=product/category&language=en-gb&path=20
        - listitem [ref=f1e55]:
          - link "Laptops & Notebooks" [ref=f1e56] [cursor=pointer]:
            - /url: http://localhost/index.php?route=product/category&language=en-gb&path=18
        - listitem [ref=f1e57]:
          - link "Components" [ref=f1e58] [cursor=pointer]:
            - /url: http://localhost/index.php?route=product/category&language=en-gb&path=25
        - listitem [ref=f1e59]:
          - link "Tablets" [ref=f1e60] [cursor=pointer]:
            - /url: http://localhost/index.php?route=product/category&language=en-gb&path=57
        - listitem [ref=f1e61]:
          - link "Software" [ref=f1e62] [cursor=pointer]:
            - /url: http://localhost/index.php?route=product/category&language=en-gb&path=17
        - listitem [ref=f1e63]:
          - link "Phones & PDAs" [ref=f1e64] [cursor=pointer]:
            - /url: http://localhost/index.php?route=product/category&language=en-gb&path=24
        - listitem [ref=f1e65]:
          - link "Cameras" [ref=f1e66] [cursor=pointer]:
            - /url: http://localhost/index.php?route=product/category&language=en-gb&path=33
        - listitem [ref=f1e67]:
          - link "MP3 Players" [ref=f1e68] [cursor=pointer]:
            - /url: http://localhost/index.php?route=product/category&language=en-gb&path=34
    - generic [ref=f1e69]:
      - list [ref=f1e70]:
        - listitem [ref=f1e71]:
          - link "" [ref=f1e72] [cursor=pointer]:
            - /url: http://localhost/index.php?route=common/home&language=en-gb
        - listitem [ref=f1e74]:
          - link "Account" [ref=f1e75] [cursor=pointer]:
            - /url: http://localhost/index.php?route=account/account&language=en-gb
        - listitem [ref=f1e76]:
          - link "Register" [ref=f1e77] [cursor=pointer]:
            - /url: http://localhost/index.php?route=account/register&language=en-gb
      - generic [ref=f1e78]:
        - generic [ref=f1e79]:
          - heading "Register Account" [level=1] [ref=f1e80]
          - paragraph [ref=f1e81]:
            - text: If you already have an account with us, please login at the
            - link "login page" [ref=f1e82] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/login&language=en-gb
            - text: .
          - generic [ref=f1e83]:
            - group "Your Personal Details" [ref=f1e84]:
              - generic [ref=f1e86]:
                - generic [ref=f1e87]: "* First Name"
                - textbox "* First Name" [ref=f1e89]:
                  - /placeholder: First Name
                  - text: Major
              - generic [ref=f1e90]:
                - generic [ref=f1e91]: "* Last Name"
                - textbox "* Last Name" [ref=f1e93]:
                  - /placeholder: Last Name
                  - text: Fahey
              - generic [ref=f1e94]:
                - generic [ref=f1e95]: "* E-Mail"
                - textbox "* E-Mail" [ref=f1e97]:
                  - /placeholder: E-Mail
                  - text: Major_Fahey@example.com
            - group "Your Password" [ref=f1e98]:
              - generic [ref=f1e100]:
                - generic [ref=f1e101]: "* Password"
                - textbox "* Password" [ref=f1e103]:
                  - /placeholder: Password
                  - text: tiqimuwi
            - group "Newsletter" [ref=f1e104]:
              - generic [ref=f1e106]:
                - generic [ref=f1e107]: Subscribe
                - checkbox [ref=f1e110]
            - generic [ref=f1e111]:
              - generic [ref=f1e112]:
                - generic [ref=f1e113]:
                  - text: I have read and agree to the
                  - link "Privacy Policy" [ref=f1e114] [cursor=pointer]:
                    - /url: http://localhost/index.php?route=information/information.info&language=en-gb&information_id=3
                - checkbox [checked] [ref=f1e115]
              - button "" [disabled]
        - complementary [ref=f1e116]:
          - generic [ref=f1e117]:
            - link "Login" [ref=f1e118] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/login&language=en-gb
            - link "Register" [ref=f1e119] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/register&language=en-gb
            - link "Forgotten Password" [ref=f1e120] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/forgotten&language=en-gb
            - link "My Account" [ref=f1e121] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/account&language=en-gb
            - link "Payment Methods" [ref=f1e122] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/payment_method&language=en-gb
            - link "Address Book" [ref=f1e123] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/address&language=en-gb
            - link "Wish List" [ref=f1e124] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/wishlist&language=en-gb
            - link "Order History" [ref=f1e125] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/order&language=en-gb
            - link "Downloads" [ref=f1e126] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/download&language=en-gb
            - link "Subscriptions" [ref=f1e127] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/subscription&language=en-gb
            - link "Reward Points" [ref=f1e128] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/reward&language=en-gb
            - link "Returns" [ref=f1e129] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/returns&language=en-gb
            - link "Transactions" [ref=f1e130] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/transaction&language=en-gb
            - link "Newsletter" [ref=f1e131] [cursor=pointer]:
              - /url: http://localhost/index.php?route=account/newsletter&language=en-gb
  - contentinfo [ref=f1e132]:
    - generic [ref=f1e133]:
      - generic [ref=f1e134]:
        - generic [ref=f1e135]:
          - heading "Information" [level=5] [ref=f1e136]
          - list [ref=f1e137]:
            - listitem [ref=f1e138]:
              - link "Terms & Conditions" [ref=f1e139] [cursor=pointer]:
                - /url: http://localhost/index.php?route=information/information&language=en-gb&information_id=2
            - listitem [ref=f1e140]:
              - link "Delivery Information" [ref=f1e141] [cursor=pointer]:
                - /url: http://localhost/index.php?route=information/information&language=en-gb&information_id=4
            - listitem [ref=f1e142]:
              - link "About Us" [ref=f1e143] [cursor=pointer]:
                - /url: http://localhost/index.php?route=information/information&language=en-gb&information_id=1
            - listitem [ref=f1e144]:
              - link "Privacy Policy" [ref=f1e145] [cursor=pointer]:
                - /url: http://localhost/index.php?route=information/information&language=en-gb&information_id=3
        - generic [ref=f1e146]:
          - heading "Customer Service" [level=5] [ref=f1e147]
          - list [ref=f1e148]:
            - listitem [ref=f1e149]:
              - link "Contact Us" [ref=f1e150] [cursor=pointer]:
                - /url: http://localhost/index.php?route=information/contact&language=en-gb
            - listitem [ref=f1e151]:
              - link "Returns" [ref=f1e152] [cursor=pointer]:
                - /url: http://localhost/index.php?route=account/returns.add&language=en-gb
            - listitem [ref=f1e153]:
              - link "Site Map" [ref=f1e154] [cursor=pointer]:
                - /url: http://localhost/index.php?route=information/sitemap&language=en-gb
        - generic [ref=f1e155]:
          - heading "Extras" [level=5] [ref=f1e156]
          - list [ref=f1e157]:
            - listitem [ref=f1e158]:
              - link "Brands" [ref=f1e159] [cursor=pointer]:
                - /url: http://localhost/index.php?route=product/manufacturer&language=en-gb
            - listitem [ref=f1e160]:
              - link "Affiliate" [ref=f1e161] [cursor=pointer]:
                - /url: http://localhost/index.php?route=account/affiliate&language=en-gb
            - listitem [ref=f1e162]:
              - link "Specials" [ref=f1e163] [cursor=pointer]:
                - /url: http://localhost/index.php?route=product/special&language=en-gb
        - generic [ref=f1e164]:
          - heading "My Account" [level=5] [ref=f1e165]
          - list [ref=f1e166]:
            - listitem [ref=f1e167]:
              - link "My Account" [ref=f1e168] [cursor=pointer]:
                - /url: http://localhost/index.php?route=account/account&language=en-gb
            - listitem [ref=f1e169]:
              - link "Order History" [ref=f1e170] [cursor=pointer]:
                - /url: http://localhost/index.php?route=account/order&language=en-gb
            - listitem [ref=f1e171]:
              - link "Wish List" [ref=f1e172] [cursor=pointer]:
                - /url: http://localhost/index.php?route=account/wishlist&language=en-gb
            - listitem [ref=f1e173]:
              - link "Newsletter" [ref=f1e174] [cursor=pointer]:
                - /url: http://localhost/index.php?route=account/newsletter&language=en-gb
      - separator [ref=f1e175]
      - paragraph [ref=f1e176]:
        - text: Powered By
        - link "OpenCart" [ref=f1e177] [cursor=pointer]:
          - /url: https://www.opencart.com
        - text: Your Store © 2026
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { TestConfig } from "../test.config";
  3  | import { HomePage } from "../pages/HomePage";
  4  | import { RegisterPage } from "../pages/RegisterPage";
  5  | import { RandomDataGenerator } from "../utils/RandomDataGenerator";
  6  | import { ActionResultPage } from "../pages/ActionResultPage";
  7  | 
  8  | test("User registeration with valid credentials", async ({ page }) => {
  9  |   const config = new TestConfig();
  10 | 
  11 |   await page.goto(`${config.appUrl}`);
  12 | 
  13 |   // Access Homepage
  14 |   const homePage = new HomePage(page);
  15 |   await expect(homePage.isHomePageLoaded()).resolves.toBe(true);
  16 |   await homePage.clickMyAccountDropdown();
  17 |   await homePage.clickRegisterOption();
  18 | 
  19 |   // Perform register account
  20 |   const registerPage = new RegisterPage(page);
  21 |   await expect(registerPage.isRegisterPageLoaded()).resolves.toBe(true);
  22 |   let firstName = RandomDataGenerator.generateRandomFirstName();
  23 |   let lastName = RandomDataGenerator.generateRandomLastName();
  24 |   let email = RandomDataGenerator.generateRandomEmail(firstName, lastName);
  25 |   let password = RandomDataGenerator.generateRandomPassword();
  26 |   await registerPage.inputRegisterForm(firstName, lastName, email, password);
  27 |   await registerPage.clickPrivacyPolicyToggle();
  28 |   await registerPage.clickContinueButton();
  29 | 
> 30 |   expect(registerPage.isSuccessRegistrationMessageDisplayed()).resolves.toBe(
     |                                                                         ^ Error: expect(received).resolves.toBe(expected) // Object.is equality
  31 |     true,
  32 |   );
  33 | });
  34 | 
```