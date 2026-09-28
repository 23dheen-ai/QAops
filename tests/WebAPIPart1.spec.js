const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../Utiles/APIUtils');
const loginPayload = { userEmail: "gdheena1@gmail.com", userPassword: "Dheena@12" };
const orderPayload = { orders: [{ country: "Dominica", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };
let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test ('API test for event creation and booking', async ({ page }) => {
    
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client');
    
   await page.locator("button[routerlink*='myorders']").click();
   //scan the table to get our order id
   await page.waitForLoadState("networkidle");
   await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    const rowCount = await rows.count();
    console.log(rowCount);
    for (let i = 0; i < rowCount; ++i) {
        const orderIdCell = await rows.nth(i).locator("th").first().textContent();
        if (response.orderId.includes(orderIdCell)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    await page.pause();
    const validation = await page.locator(".col-text").textContent();
    await expect(response.orderId.includes(validation)).toBeTruthy();
});