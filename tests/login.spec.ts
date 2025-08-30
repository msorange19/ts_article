import { test, expect } from "../config/fixtures";
// @ts-ignore
import { getUserFromApi } from "../apicall/apicallback.js";
// @ts-ignore
import { readCsv, updateCsv } from "../config/testcase.ts";
// @ts-ignore
import testData from "../config/data.json";
import path from "path";

const csvPath = path.resolve(
    "/Users/muhaiminulislam/WebstormProjects/ts_article/config/datadriven.csv"
);

let records: any[] = readCsv(csvPath);

console.log("Loaded records:", records);

test.describe("loginPage validation", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
    });

    if (records.length === 0) {
        test("Fail if no records loaded", async () => {
            throw new Error("CSV returned no test records!");
        });
    }

    records.forEach((record) => {
        test(`Login Test: ${record["Test Name"]}`, async ({ loginPage, request, page }) => {
            try {
                console.log("Running test:", record["Test Name"]);
                console.log("Expected status:", record["Status"]);

                await loginPage.verifyLoginInput(testData.username, testData.password);

                const apiUser = await getUserFromApi(request);
                console.log("API Username:", apiUser.username);

                const uiUsername = await page.textContent(
                    `.nav-link[href="/profile/${apiUser.username}"]`
                );
                console.log("UI Username:", uiUsername);

                expect(uiUsername?.trim()).toBe(apiUser.username);

                // ✅ If test passes → update status
                updateCsv(csvPath, record["Test Name"], "Pass");
            } catch (err) {
                // ❌ If test fails → update status
                updateCsv(csvPath, record["Test Name"], "Fail");
                throw err; // rethrow to mark Playwright test failed
            }
        });
    });
});
