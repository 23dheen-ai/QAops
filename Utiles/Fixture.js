const base = require('@playwright/test');
const {APIUtils} = require('./APIUtils.js')
const {request} = require('@playwright/test')

const loginPayload = { userEmail: "gdheena1@gmail.com", userPassword: "Dheena@12" };
const orderPayload = { orders: [{ country: "Dominica", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };


exports.customtest = base.test.extend({ authenticatedPage: async ({browser}, use)=>
{   
    const context = await browser.newContext();
    const page =  await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("gdheena1@gmail.com");
    await page.locator("#userPassword").fill("Dheena@12");
    await page.locator("#login").click();
    //now we are on the products page
    await page.waitForLoadState("networkidle");

    await use(page);
},
createOrder: async({},use)=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    const response = await apiUtils.createOrder(orderPayload);
    await use(response);

},

testDataForOrder:{
    productName: 'iphone 13 pro'
}
})