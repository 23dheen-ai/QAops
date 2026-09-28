const {test, expect} = require('@playwright/test');

test('@web Flow Test', async ({page}) => {
    const email = "gdheena1@gmail.com";
    const productName = "iphone 13 pro";
    const userName = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const signInBtn = page.locator("#login")
    const products = page.locator(".card-body");
    const cartBtn = page.locator("[routerlink*='cart']");
    await page.goto("https://rahulshettyacademy.com/client");
    await userName.fill(email);
    await password.fill("Dheena@12");
    await signInBtn.click();

    //now we are on the products page
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    const titles = await products.allTextContents();
    console.log(titles);

    const count = await products.count();
    console.log(count);
    
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await cartBtn.click();

    //now we are on the cart page
    const isProductVisible = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    console.log(isProductVisible);

    await page.locator(".totalRow button").click();
    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
   
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();

   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
   await page.locator("button[routerlink*='myorders']").click();
   //scan the table to get our order id
   await page.waitForLoadState("networkidle");
   await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    const rowCount = await rows.count();
    console.log(rowCount);
    for (let i = 0; i < rowCount; ++i) {
        const orderIdCell = await rows.nth(i).locator("th").first().textContent();
        if (orderId.includes(orderIdCell)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    
    const validation = await page.locator(".col-text").textContent();
    await expect(orderId.includes(validation)).toBeTruthy();

});

test('@web Using playwright special locators to test', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
// page.route('**/*.{jpg,png,jpeg}', route => route.abort());
    page.on('request', request => console.log(request.url()));
    page.on('response', Response => console.log(Response.url(), Response.status()));
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});
