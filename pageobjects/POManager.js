const { CartPage } = require("./CartPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrderConfirmationPage } = require("./OrderConfirmationPage");
const { OrdersHistoryPage } = require("./OrderHistoryPage");

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersConfirmationPage = new OrderConfirmationPage(this.page);
        this.cartPage = new CartPage(this.page);

    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getOrderHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrderConfirmationPage() {
        return this.ordersConfirmationPage;
    }

}
module.exports = { POManager };