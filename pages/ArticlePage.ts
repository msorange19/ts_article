import {Locator, Page} from "@playwright/test";

export class ArticlePage {
    readonly page:Page;
    readonly newArticleBtn:Locator;

    constructor(page:Page) {
        this.page = page;
        this.newArticleBtn = page.locator('.ion-compose')
    }


    async verifyArticle(): Promise<void> {
        await this.newArticleBtn.click();
    }
}