import {test as base} from '@playwright/test'
import {LoginPage} from "../pages/LoginPage";
import {HomePage} from "../pages/HomePage";
type article = {
    loginPage: LoginPage
    homePage: HomePage
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
        }
    }
)


export {expect} from '@playwright/test';

