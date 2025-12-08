import {test, expect} from "../config/fixtures";
// @ts-ignore
import {favCount, getUserFromApi, tagFinder} from "../apicall/apicallback.js";
// @ts-ignore
// @ts-ignore
import testData from "../config/data.json";
import path from "path";
import {describe} from "node:test";
import {request} from "node:http";

test.describe("Home", () => {
    test.beforeEach(async ({homePage}) => {
        await homePage.navigateToHomePage();
    });
    // @ts-ignore
    test("Home page", async ({homePage,request,page}) => {
        const tag = await tagFinder(request);
        const feTags = await homePage.verifyTag();
        const feFavCounts = await homePage.verifyFavCount();
        console.log("FE favCount: ", feFavCounts);
        const feCount = feFavCounts.map(c => Number(c.trim()));
        console.log("FE count: ", feCount);
        const beFavCounts = await favCount(request);
        expect(feCount).toEqual(beFavCounts);
    })
})