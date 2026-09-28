const { Before, After, BeforeStep, AfterStep,Status} = require("@cucumber/cucumber");
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');




Before(async function(){
    // Write code here that runs befor 
        const browser = await playwright.chromium.launch({headless : false});
        const context = await browser.newContext();
        this.page = await context.newPage();
        this.pomanager = new POManager(this.page);

});

BeforeStep(function(){
   //This hooks will be execute before all the steps in a scenario
});

AfterStep(async function ({result}){
    if(result.status == Status.FAILED){
        await this.page.screenshot({path:"FailedScreenshot.png"});
    }

});

After(function(){
    console.log("I am last to execute")
})