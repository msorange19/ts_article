import {test as base} from '@playwright/test'
import {LoginPage} from "../pages/LoginPage";

type login = {
    loginPage: LoginPage
}


// @ts-ignore
export const test = base.extend<login>(
    {

        loginPage: async ({page}, use) => {const loginPage = new LoginPage(page)
            await use(loginPage);
        }
    }
)


export { expect } from '@playwright/test';

