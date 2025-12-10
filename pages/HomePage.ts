import {Page, Locator, expect} from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly popularTagList: Locator;
    private userName: Locator;
    private favCount: Locator;
    constructor(page: Page) {
        this.page = page;
        this.popularTagList = page.locator("//div[@class='tag-list']//a[@class='tag-default tag-pill']");
        this.userName = page.locator("//div/ul/li[4]");
        this.favCount = page.locator('.btn.btn-sm.btn-outline-primary');
    }

    async navigateToHomePage() {
        // @ts-ignore
        await this.page.goto('https://conduit.bondaracademy.com/')
    }

    async verifyTag(): Promise<string[]> {
        await this.popularTagList.first().waitFor({state: "visible"});
        return await this.popularTagList.allInnerTexts();
    }

    async verifyFavCount(): Promise<string[]> {
        await this.favCount.first().waitFor({state: "visible"});

        return await this.favCount.allInnerTexts();
    }

}
