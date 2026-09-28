const {test, expect} = require('@playwright/test');
const {POManager} =require('../pageobjects/POManager');

//another way of parsing data by changing test behaviour using fixture
const {customtest} = require('../Utiles/test-base');
//JSON => String => js object using 
const dataset = JSON.parse(JSON.stringify(require("../Utiles/FlowPOMTestData.json")));

//to pass the parameterized tests datas using multiples datas
for(const data of dataset){
test(`Page Object Model Implementation of ${data.productName}`, async ({page}) => {
    const pomanager = new POManager(page);
    const loginPage = pomanager.getLoginPage();
    await loginPage.url();
    await loginPage.validLogin(data.email,data.pass);
    const dashboardPage = pomanager.getDashboardPage();
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.navigateToCart();


    //now we are on the products page
    //await page.pause()

    //now we are on the cart page
    const cartPage = pomanager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = pomanager.getOrderConfirmationPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = pomanager.getOrderHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});}

customtest(`Page Object Model Implementation`, async ({page, testDataForOrder}) => {
    const pomanager = new POManager(page);
    const loginPage = pomanager.getLoginPage();
    await loginPage.url();
    await loginPage.validLogin(testDataForOrder.email,testDataForOrder.pass);
    const dashboardPage = pomanager.getDashboardPage();
    await dashboardPage.searchProduct(testDataForOrder.productName);
    await dashboardPage.navigateToCart();


    //now we are on the products page
    //await page.pause()

    //now we are on the cart page
    const cartPage = pomanager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
});

