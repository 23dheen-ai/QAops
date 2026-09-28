class DashboardPage {

    constructor(page) {

        this.page = page;
        this.products = page.locator(".card-body");
        this.productsTxt = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProduct(productName) {

        await this.productsTxt.first().waitFor();
        const titles = await this.productsTxt.allTextContents();
        console.log(titles);

        const count = await this.products.count();
        console.log(count);

        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                console.log("product added");
                break;
            }
            console.log("product not added");
        }
    

    }
    async navigateToCart() {
        
        await this.cart.click();
    }

    async navigateToOrders()
{
    await this.orders.click();
}
}
module.exports = {DashboardPage};