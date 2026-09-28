//const { CartPage } = require("./CartPage"); //JS
import {CartPage} from "./CartPage";
//const { DashboardPage } = require("./DashboardPage");
import{DashboardPage} from "./DashboardPage";
//const { LoginPage } = require("./LoginPage"); //JS 
import {LoginPage} from "./LoginPage"; 
//const { OrderConfirmationPage } = require("./OrderConfirmationPage");
import{OrderConfirmationPage} from "./OrderConfirmationPage";
//const { OrdersHistoryPage } = require("./OrderHistoryPage");
import{OrderHistoryPage} from "./OrderHistoryPage";
import{Page} from '@playwright/test'

export class POManager {
    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    ordersHistoryPage : OrderHistoryPage;
    ordersConfirmationPage : OrderConfirmationPage;
    cartPage : CartPage;
    page : Page;


    constructor(page : Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrderHistoryPage(this.page);
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