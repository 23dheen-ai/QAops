const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login Ecommerce application with {string} and {string}',{timeout : 100*1000}, async function (username, password) {

    const loginPage = this.pomanager.getLoginPage();
    await loginPage.url();
    await loginPage.validLogin(username, password);
});

When('add {string} to cart',{timeout : 100*1000}, async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.pomanager.getDashboardPage();
    await this.dashboardPage.searchProduct(productName);
    await this.dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in the cart',{timeout : 100*1000}, async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.pomanager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('enter valid details and place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.pomanager.getOrderConfirmationPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('verify order is present in the orderHistoryPage', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.pomanager.getOrderHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
Given('a login Ecommerce error validation application with {string} and {string}',async function (username , pass) {
   const userName = this.page.locator("#username");
    const password = this.page.locator("#password");
    const signInBtn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    //css is suggested by playwright, but xpath is also supported
    //and type method is used to fill the input field, but playwright also supports fill method
    await userName.fill(username);
    await password.fill(pass);
    await signInBtn.click();
});

Then('verify error message is displayed',async function () {
      console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});

