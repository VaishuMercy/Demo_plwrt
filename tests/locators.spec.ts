/*
Locators 
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/
import { test, expect,Locator } from '@playwright/test';
test("TC1 - Verify user is able to login to Saucedemo",async({page})=>{
    //open sauce demo
    await page.goto("https://www.saucedemo.com/" );
    //enter user name
    await page.getByPlaceholder('Username').fill('standard_user');
    //enter password
    await page.getByPlaceholder('Password').fill('secret_sauce');
     
    //by role->button,textbox,link
    //click on login button
    await page.getByRole('button',{name:'Login'}).click();
    //Assertion
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

});
test('TC2 - Verify user is able to login with invalid credentials',async({page})=>{
    //open sauce demo
        await page.goto("https://www.saucedemo.com/" );
    
    //enter user name       
    await page.getByPlaceholder('Username').fill('invalid_user');
    //enter password
    await page.getByPlaceholder('Password').fill('invalid_password');
    //click on login button
    await page.getByRole('button',{name:'Login'}).click();
    //Assertion
    await expect(
        page.locator('[data-test="error"]')).toBeVisible();

});
test('TC3 - Add product and complete checkout', async ({ page }) => {
    // Step 1: Login
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]')
      .click();

    // Step 2: Add product to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');

    // Step 3: Open cart
    await page.locator('.shopping_cart_link').click();

    await expect(
      page.locator('.inventory_item_name')
    ).toHaveText('Sauce Labs Backpack');

    // Step 4: Proceed to checkout
    await page.locator('[data-test="checkout"]').click();

    // Step 5: Enter customer details
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('600001');

    await page.locator('[data-test="continue"]').click();

    // Step 6: Verify order summary and finish
    await expect(page.locator('.title'))
      .toHaveText('Checkout: Overview');

    await page.locator('[data-test="finish"]').click();

    // Step 7: Verify successful order
    await expect(
      page.locator('.complete-header')
    ).toHaveText('Thank you for your order!');
  });

