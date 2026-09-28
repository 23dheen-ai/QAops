const {test, expect} = require('@playwright/test');

test("browser First Playwright Test", async ({browser}) => {
    //chrome - plugin/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username")
    const password = page.locator("#password")
    const signInBtn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-body a")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css is suggested by playwright, but xpath is also supported
    //and type method is used to fill the input field, but playwright also supports fill method
    await page.locator("#username").fill("rahulshademy");
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});

test("UI controls performance", async ({page}) => {
    const userName = page.locator("#username")
    const password = page.locator("#password")
    const dropdown = page.locator("select.form-control")
    const radioBtns = page.locator(".radiotextsty")
    const documentLink = page.locator("[href*='documents-request']")
    const signInBtn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-body a")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await dropdown.selectOption("consult");
    await radioBtns.nth(1).click();
    console.log(await radioBtns.last().isChecked());
    await page.locator("#okayBtn").click();
    await page.locator("#terms").click();
    console.log(await page.locator("#terms").isChecked());
    await page.locator("#terms").uncheck();
    console.log(await page.locator("#terms").isChecked());  
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    await documentLink.click();
});

