import {Page, Locator} from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userNameInputField: Locator;
    readonly loginButton: Locator;
    readonly passInputField: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInputField = page.locator('input[placeholder="Email"]');
        this.passInputField = page.locator('input[formcontrolname="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.error-messages li');
    }

    async navigateToLoginPage() {
        await this.page.goto('https://conduit.bondaracademy.com/login')
    }

    async verifyLoginInput(username: string, password: string) {
        await this.userNameInputField.click();
        await this.userNameInputField.fill(username)
        await this.passInputField.click();
        await this.passInputField.fill(password);
        await this.loginButton.click();
    }

    async verifyErrorMessage() {

        await this.errorMessage.waitFor({ state: 'visible' });
        return await this.errorMessage.textContent();
    }
}