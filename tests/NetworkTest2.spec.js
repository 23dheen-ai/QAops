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
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", 
       route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'}));
        //intercepting request - API request -> {Playwright FakeRequest }-browser
       
   await page.locator("button:has-text('View')").first().click();
   await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
   await page.pause();
   
});