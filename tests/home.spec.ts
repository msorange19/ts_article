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
    test.beforeAll(async ({ request }) => {
        await getUserFromApi(request);   // only once per file
    });
    test.beforeEach(async ({homePage}) => {
        await homePage.navigateToHomePage();
    });
    // @ts-ignore
    test(" verify Home page", async ({homePage,request,page}) => {
        const tag = await tagFinder(request);
        const feTags = await homePage.verifyTag();
        expect(tag).toEqual(feTags);

    })
    test("Verify Tag Favourite count", async ({homePage,request,page}) => {
        const feFavCounts = await homePage.verifyFavCount();
        console.log('feFavCounts',feFavCounts);

        const feCount = feFavCounts.map(c => Number(c.trim()));
        console.log('fecount ', feCount);
        const beFavCounts = await favCount(request);
        console.log('beFavCounts',beFavCounts.map((a: { favoritesCount: any; }) => a.favoritesCount));
        expect(feCount).toEqual(beFavCounts.map((a: { favoritesCount: any; }) => a.favoritesCount));
    })
})