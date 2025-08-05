import {test, expect} from '../config/fixtures';
import {describe} from "node:test";
import testData  from '../config/data.json'


test.describe('loginPage validation',  () => {
    test.beforeEach(async ({loginPage}) => {
        await loginPage.navigateToLoginPage();
    })
 test('@verify login with valid username and invalid password', async ({loginPage}) => {
     await loginPage.verifyLoginInput(testData.username, testData.invalid_password);
 })
})