const {test, expect} = require("@playwright/test");

test("Client App Test", async ({page}) => {
    const userName = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const loginBtn = page.locator("#login")
    const cardTitles = page.locator(".card-body b")
    await page.goto("https://rahulshettyacademy.com/client");
    await userName.fill("gdheena1@gmail.com");
    await password.fill("Dheena@12");
    await loginBtn.click();
    await page.waitForLoadState("networkidle");
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

})