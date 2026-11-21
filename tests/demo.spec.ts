import { test, expect,Locator } from '@playwright/test';
test("TC1-Verify user is able to login with valid credentials",async({page})=>{
  await page.goto("https://www.saucedemo.com/" );
  await page.setViewportSize({ width: 1920, height: 1080 });  
  //enter user name
    await page.getByPlaceholder('Username').fill('standard_user');
    //enter password
    await page.getByPlaceholder('Password').fill('secret_sauce');
    //click on login button
    await page.getByRole('button',{name:'Login'}).click();
    //Assertion
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await page.waitForTimeout(3000);    
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
    await expect( page.locator('[data-test="error"]')).toBeVisible();
    await page.waitForTimeout(3000); 
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
    await page.waitForTimeout(3000); 
    // Step 2: Add product to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();
    await page.waitForTimeout(2000); 
    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');
    await page.waitForTimeout(2000); 
    // Step 3: Open cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(2000); 
    await expect(
      page.locator('.inventory_item_name')
    ).toHaveText('Sauce Labs Backpack');
    await page.waitForTimeout(3000); 
    // Step 4: Proceed to checkout
    await page.locator('[data-test="checkout"]').click();

    // Step 5: Enter customer details
    await page.locator('[data-test="firstName"]').fill('Vaishu');
    await page.locator('[data-test="lastName"]').fill('V');
    await page.locator('[data-test="postalCode"]').fill('625531');
    await page.waitForTimeout(2000); 
    await page.locator('[data-test="continue"]').click();

    // Step 6: Verify order summary and finish
    await expect(page.locator('.title'))
      .toHaveText('Checkout: Overview');
    await page.waitForTimeout(3000); 
    await page.locator('[data-test="finish"]').click();

    // Step 7: Verify successful order
    await expect(
      page.locator('.complete-header')
    ).toHaveText('Thank you for your order!');
    await page.waitForTimeout(4000); 
  });

  test('TC4 - Select Price low to high & add product then remove that product', async ({ page }) => {
    // Step 1: Login
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]')
      .click();
    await page.waitForTimeout(3000); 
    await page.locator('.product_sort_container').selectOption('lohi');
    await page.waitForTimeout(3000);
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page.waitForTimeout(3000);
    // click shopping cart and verify selected product is added to cart
    await page.locator('.shopping_cart_link').click();
    await expect(
      page.locator('.inventory_item_name')
    ).toHaveText('Sauce Labs Onesie');     
    await page.waitForTimeout(3000);
    //click remove button and verify product is removed from cart           

    await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
    await expect(
      page.locator('.cart_item')
    ).toHaveCount(0);
    await page.waitForTimeout(3000);
    //proceed to checkout button
    await page.locator('[data-test="checkout"]').click();
    await page.waitForTimeout(3000);
    
});
test('TC5 - Continue the shopping and Select Price High to low / print shipping price details', async ({ page }) => {
    // Step 1: Login
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]')
      .click();
    await page.waitForTimeout(3000);
    //Add product to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.waitForTimeout(1000);
    //click shopping cart and verify selected product is added to cart
    await page.locator('.shopping_cart_link').click();
    await expect(
      page.locator('.inventory_item_name')
    ).toHaveText('Sauce Labs Bike Light');     
    await page.waitForTimeout(1000);
    //click continue shopping button
    await page.locator('[data-test="continue-shopping"]').click();
    await page.waitForTimeout(1000);
    //select price high to low
    await page.locator('.product_sort_container').selectOption('hilo');
    await page.waitForTimeout(3000);    
    //click add to cart button for the first product
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await page.waitForTimeout(1000);    
    //click checkout
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(1000);    
    //Enter checkout information
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Mercy');
    await page.locator('[data-test="lastName"]').fill('V');
    await page.locator('[data-test="postalCode"]').fill('605531');
    await page.waitForTimeout(2000); 
    await page.locator('[data-test="continue"]').click();
    await page.waitForTimeout(2000);
    //print payment, shipping and total information
    const paymentInfo:Locator=page.locator('.summary_value_label').first();
    const shippingInfo:Locator=page.locator('.summary_value_label').nth(1);
    console.log("Payment Information: "+await paymentInfo.textContent());
    console.log("Shipping Information: "+await shippingInfo.textContent());
    const totalInfo:Locator=page.locator('.summary_total_label');
    console.log("Total Information: "+await totalInfo.textContent());
    await page.waitForTimeout(2000);
});


    


