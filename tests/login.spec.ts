import {test, expect} from '../config/fixtures';
import {describe} from "node:test";
// @ts-ignore
import {getTag, getUserFromApi} from '../apicall/apicallback.js'
// @ts-ignore
import testData  from '../config/data.json'
import {request} from "@playwright/test";


test.describe('loginPage validation',  () => {
    test.beforeEach(async ({loginPage}) => {
        await loginPage.navigateToLoginPage();
    })
 test('@verify login with valid username and invalid password', async ({loginPage,request,page}) => {
     await loginPage.verifyLoginInput(testData.username, testData.password);


     const apiUser = await getUserFromApi(request);
     console.log('API Username:', apiUser.username);
     const uiUsername = await page.textContent(`.nav-link[href="/profile/${apiUser.username}"]`);
     console.log('UI Username:', uiUsername);

     expect(uiUsername?.trim()).toBe(apiUser.username);


     const sessionStorage = await page.context().storageState({ path: 'state.json' });
     console.log(sessionStorage);
     //expect(await loginPage.verifyLoginInput(testData.username, testData.password)).toEqual(getTag())
 })
})