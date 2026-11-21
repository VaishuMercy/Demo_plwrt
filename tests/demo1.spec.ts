import { test, expect,Locator } from '@playwright/test';
test("TC6-Verify user is able to login with only space as a credentials",async({page})=>{
  await page.goto("https://www.saucedemo.com/" );
  await page.setViewportSize({ width: 1920, height: 1080 });  
  //enter user name
    await page.getByPlaceholder('Username').fill(' ');
    //enter password
    await page.getByPlaceholder('Password').fill(' ');
    //click on login button
    await page.getByRole('button',{name:'Login'}).click();
    //assert & print error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    console.log(await page.locator('[data-test="error"]').textContent());
    await page.waitForTimeout(3000);
});
test("TC7-Verify user is able to login with valid username and invalid password",async({page})=>{
  await page.goto("https://www.saucedemo.com/" );
  await page.setViewportSize({ width: 1920, height: 1080 });  
  //enter user name
    await page.getByPlaceholder('Username').fill('standard_user');
    //enter password
    await page.getByPlaceholder('Password').fill(' ');
    //click on login button
    await page.getByRole('button',{name:'Login'}).click();
   //assert password error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    console.log(await page.locator('[data-test="error"]').textContent());
    await page.waitForTimeout(3000);
});
test("TC8-Verify user is able to login with invalid username and valid password",async({page})=>{
  await page.goto("https://www.saucedemo.com/" );
  await page.setViewportSize({ width: 1920, height: 1080 });  
  //enter user name
    await page.getByPlaceholder('Username').fill('jlkjlkjl');
    //enter password
    await page.getByPlaceholder('Password').fill('secret_sauce ');
    //click on login button
    await page.getByRole('button',{name:'Login'}).click();
   //assert username error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    console.log(await page.locator('[data-test="error"]').textContent());
    await page.waitForTimeout(3000);
});
test("TC9-Verify user is able to login with invalid username and password",async({page})=>{
  await page.goto("https://www.saucedemo.com/" );
  await page.setViewportSize({ width: 1920, height: 1080 });  
  //enter user name
    await page.getByPlaceholder('Username').fill('jlkjlkjl');
    //enter password
    await page.getByPlaceholder('Password').fill('a754246798 ');
    //click on login button
    await page.getByRole('button',{name:'Login'}).click();
   //verify and compare the error message is displayed or not "Epic sadface: Username and password do not match any user in this service"
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    console.log(errorMessage);
    await expect(errorMessage).toContain("Epic sadface: Username and password do not match any user in this service");
    await page.waitForTimeout(3000);
});
test("TC10-Verify user is able to login with locked out user and check error message",async({page})=>{
  await page.goto("https://www.saucedemo.com/" );
  await page.setViewportSize({ width: 1920, height: 1080 });  
  //enter user name
    await page.getByPlaceholder('Username').fill('locked_out_user');
    //enter password
    await page.getByPlaceholder('Password').fill('secret_sauce');
    //click on login button
    await page.getByRole('button',{name:'Login'}).click();
   //assert error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    console.log(await page.locator('[data-test="error"]').textContent());
    await page.waitForTimeout(3000);
});

