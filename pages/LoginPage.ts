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
        this.passInputField = page.locator('input[placeholder="Password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.error-messages');
    }
}