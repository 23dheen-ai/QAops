const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../Utiles/APIUtils');
const loginPayload = { userEmail: "gdheena1@gmail.com", userPassword: "Dheena@12" };
const orderPayload = { orders: [{ country: "Dominica", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };
const fakePayLoadsOrders = {data:[],message:"No Orders"};
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
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
      async route => { 
        //But we have to  get the actual response first
        const response = page.request.fetch(route.request())
        let body = JSON.stringify(fakePayLoadsOrders);
        route.fulfill(
            {
                response, 
                body,
            }
        )
        //intercepting response - API response -> {Playwright FakeResponse }-browser
       });
   await page.locator("button[routerlink*='myorders']").click();
   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
       console.log(await page.locator(".mt-4").textContent());
});