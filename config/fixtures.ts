import {test as base} from '@playwright/test'
import {LoginPage} from "../pages/LoginPage";
import {HomePage} from "../pages/HomePage";
import {ArticlePage} from "../pages/ArticlePage";
type article = {
    loginPage: LoginPage
    homePage: HomePage
    articlePage: ArticlePage

}


// @ts-ignore
// @ts-ignore
export const test = base.extend<article>(
    {

        loginPage: async ({page}, use) => {
            const loginPage = new LoginPage(page)
            await use(loginPage);
        },

        homePage: async ({page}, use) => {
            const homePage = new HomePage(page)
            await use(homePage);
        },
        articlePage: async ({page}, use) => {
            const articlePage = new ArticlePage(page)
            await use(articlePage);
        }
    }
)


export {expect} from '@playwright/test';

