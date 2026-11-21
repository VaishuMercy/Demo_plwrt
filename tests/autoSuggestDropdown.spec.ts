import {test,expect,Locator} from '@playwright/test';
test("Autosuggest dropdown functionality",async({page})=>{
  await page.goto("https://www.flipkart.com/" );
  //enter the values in search bar
  await page.locator("input[name='q']").fill("smart");
  //capture the auto suggest dropdown values
  
});