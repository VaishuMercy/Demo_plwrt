import {test,expect} from '@playwright/test'

test('LoginTest',async ({page})=>{
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    //Validate the title of the page
    await expect(page).toHaveTitle('Test Login | Practice Test Automation');

    await page.waitForTimeout(5000);


})