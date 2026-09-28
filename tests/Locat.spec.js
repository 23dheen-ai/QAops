const {test, expect} = require('@playwright/test');

test('@web Playwright special locators', async ({page}) => {
   
    test.setTimeout(40000);
    const slowTime = expect.configure({timeout: 8000});
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("123456");
    await page.getByRole("button", {name: "Submit"}).click();
    //It will wait for 5 seconds for the text to be visible on the page
    await expect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible();
    await page.getByRole("link", {name: "Shop"}).click();
    await slowTime(page.locator(".my-4").first()).toHaveText("Shop Name");
    await page.locator("app-card").filter({hasText: "Blackberry"}).getByRole("button", {name: "Add"}).click();
    


});