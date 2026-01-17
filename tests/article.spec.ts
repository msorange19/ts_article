import {test} from "../config/fixtures";
// @ts-ignore
import {favCount, getUserFromApi, tagFinder} from "../apicall/apicallback.js";

test.describe("article", () => {
    test.beforeAll(async ({request}) => {
        await getUserFromApi(request);   // only once per file
    });
    test.beforeEach(async ({homePage}) => {
        await homePage.navigateToHomePage();
    });
    test("Article", async ({articlePage}) => {
        await articlePage.verifyArticle()
    })
})