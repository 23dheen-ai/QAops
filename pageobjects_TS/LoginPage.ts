import{test, expect , Locator, Page} from '@playwright/test';

export class LoginPage {

    userName : Locator;
    password : Locator;
    signIn : Locator;
    page : Page;
    constructor(page : Page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signIn = page.locator("#login");

    }
    async url() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
    async validLogin(userName : string, password : string) {
        await this.userName.type(userName );
        await this.password.type(password);
        await this.signIn.click();
        await this.page.waitForLoadState("networkidle");
    }
}

module.exports = { LoginPage };