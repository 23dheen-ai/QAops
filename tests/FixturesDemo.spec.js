const { expect } = require('@playwright/test');
const {customtest} = require('../Utiles/Fixture.js');

customtest("Fixtures Demo Test", async({authenticatedPage,createOrder,testDataForOrder})=> {

    //Login to the application/create order and verify if the order is created from the hisoty page
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);




});

