import {Page, Locator} from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly popularTagList: Locator;
    private userName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.popularTagList = page.locator("//div[@class='tag-list']//a[@class='tag-default tag-pill']");
        this.userName = page.locator("//div/ul/li[4]");
    }

    async navigateToHomePage() {
        // @ts-ignore
        await this.page.goto('https://conduit.bondaracademy.com/')
    }

    async verifyTag(): Promise<string[]> {
        await this.popularTagList.first().waitFor({state: "visible"});
        return await this.popularTagList.allInnerTexts();
    }

}
