import{test,expect,Locator} from '@playwright/test';
test('Single Select Dropdown',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.setViewportSize({ width: 1920, height: 1080 });
    //1 SELECT OPTION FROM SINGLE SELECT DROPDOWN (4 ways)
    //await page.locator('#country').selectOption('India');//visible text
    //await page.locator('#country').selectOption({value:'uk'});//value
    //await page.locator('#country').selectOption({label:'india'});//label
    //await page.locator('#country').selectOption({index:3});//index
    await page.waitForTimeout(3000);

    //check number of options in the dropdown(count)
    //if have css =1 ...
    const dropdownOptions:Locator=page.locator('#country>option');
    await expect(dropdownOptions).toHaveCount(10);
    
    //3 check an option present in the dropdown
    
    await page.waitForTimeout(3000);
});