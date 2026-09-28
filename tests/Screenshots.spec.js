const {test, expect} = require('@playwright/test');

test.describe.configure({mode:'parallel'})
test('POPUP & table test also for validation', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com/');
    // await page.goBack();

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    await page.locator('#show-textbox').click();
    await expect(page.locator('#displayed-text')).toBeVisible();

    // Handling alert and confirm popups , 
    // if we wanted to cancel the confirm popup we can use dialog.dismiss() 
    // instead of dialog.accept()
    await page.on('dialog', dialog => dialog.accept());
    await page.locator('#alertbtn').click();
    await page.locator('#confirmbtn').click();

    await page.locator('#mousehover').scrollIntoViewIfNeeded();
    await page.locator('#mousehover').hover();
    await page.locator('text=Top').click();

    // Handling child frames
    const frame = page.frameLocator('#courses-iframe');
    await frame.locator('li a[href*="lifetime-access"]:visible').click();
    const text = await frame.locator('.text h2').textContent();
    console.log(text.split(' ')[1].trim());  

});

test("Screenshots and visual validation",async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com/');
    // await page.goBack();

    await expect(page.locator('#displayed-text')).toBeVisible();
    //one of the method to take a screenshot for partial element
    await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'});
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    //one of the method to take a screenshot for whole page
    await page.screenshot({path: 'screenshot.png'});
    await page.locator('#show-textbox').click();
    await expect(page.locator('#displayed-text')).toBeVisible();
});

test('Visual testing', async({page})=>{

    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})