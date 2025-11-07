import {test, expect} from "../config/fixtures";
// @ts-ignore
import {getUserFromApi,tagFinder} from "../apicall/apicallback.js";
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
    test("Home page", async ({homePage,request}) => {
        const tag = await tagFinder(request);
        console.log(tag);
        const feTags = await homePage.verifyTag();
        console.log("FE tags: ", feTags);

    })
})