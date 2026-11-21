import {test,expect,Locator} from '@playwright/test';
test('Text Input Actions',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const nameInput: Locator = page.locator('#name');
    expect(nameInput).toBeVisible();
    await expect(nameInput).toBeEnabled();
    
    const maxLength:string | null = await nameInput.getAttribute("maxlength");
    expect(maxLength).toBe("15");

    await nameInput.fill("Vaishu");
    const enteredValue:string=await nameInput.inputValue();
    console.log ("Input value of the  First Name:",enteredValue);
    expect(enteredValue).toBe("Vaishu");

    await page.waitForTimeout(3000);
});

//Radio Button Actions
test('Radio Button Actions',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");   
    const femaleRadio: Locator = page.locator("#female");
    
    await expect(femaleRadio).toBeVisible();
    await expect(femaleRadio).toBeEnabled();
    expect(await femaleRadio.isChecked()).toBe(false);

    await femaleRadio.check();
    expect(await femaleRadio.isChecked()).toBe(true);
    await expect(femaleRadio).toBeChecked();
    await page.waitForTimeout(3000);
    
});
//
test.only('Radio Button Actions days',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");   
    const femaleRadio: Locator = page.locator("#female");
    //select checkbox using getbylabel
    //const sundayCheckbox :Locator= page.getByLabel("Sunday");
    //await sundayCheckbox.check();
    //await expect (sundayCheckbox).toBeChecked();
    //await page.waitForTimeout(3000);

    // capture all the check box
    const days:string[]=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const checkboxes:Locator[] = days.map(index=>page.getByLabel(index));   
    expect(checkboxes.length).toBe(7);
    //select all checkboxes and assert each is checked
    for(const checkbox of checkboxes){
        await checkbox.check();
    }
    //unlock last 3 checkboxes and assert
    for (const checkbox of checkboxes.slice(-3)){
        await checkbox.uncheck();
        await expect (checkbox).not.toBeChecked();
    }

    await page.waitForTimeout(5000);

    //toggle checkboxes:if checked;if unchecked,check.assert state flipped.
    for( const checkbox of checkboxes)
    {
        if(await checkbox.isChecked())
            {
            //only if checked
             await checkbox.uncheck();
             await expect(checkbox).not.toBeChecked();
           }
        
        else{

            //only if not checked
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }


        

    }
       await page.waitForTimeout(5000); 

       //randomly select checkboxes
       const indexes:number[]=[1,3,6];
       for(const i of indexes){

        checkboxes[i].check();
        await expect(checkboxes[i]).toBeChecked();
       }
       await page.waitForTimeout(5000); 

       //select the check box based on the label
       const weekname:string="Friday";

       for(const label of days)
       {
        if(label.toLowerCase===weekname.toLowerCase)
        {
            const checkbox=page.getByLabel(label);
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
       }
    });
