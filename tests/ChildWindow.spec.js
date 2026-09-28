const {test, expect} = require("@playwright/test");

test("Child Window Test", async ({page}) => {
    const userName = page.locator("#username")
    const password = page.locator("#password")
    const signInBtn = page.locator("#signInBtn")
    const documentLink = page.locator("[href*='documents-request']")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const [newPage] = await Promise.all([
        page.waitForEvent("popup"),
        documentLink.click(),
    ]);
    const newText = await newPage.locator(".red").textContent();
    const email = newText.split("@")[1].split(" ")[0];  
    const domain = email.split(".")[0]  
    console.log(domain);

    await userName.fill(domain);
    console.log(await userName.inputValue());
    
    
});
