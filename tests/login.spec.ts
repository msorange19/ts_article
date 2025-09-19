import {test, expect} from "../config/fixtures";
// @ts-ignore
import {getUserFromApi} from "../apicall/apicallback.js";
// @ts-ignore
import {readCsv, updateCsv} from "../config/testcase.ts";
// @ts-ignore
import testData from "../config/data.json";
import path from "path";

const csvPath = path.resolve(__dirname,
    "../config/datadriven.csv"
);

let records: any[] = readCsv(csvPath);
let invalid_message;
console.log("Loaded records:", records);

test.describe.configure({ mode: "serial" });
test.describe("loginPage validation", () => {
    test.beforeEach(async ({loginPage}) => {
        await loginPage.navigateToLoginPage();
    });

    if (records.length === 0) {
        test("Fail if no records loaded", async () => {
            throw new Error("CSV returned no test records!");
        });
    }
    test.describe("Invalid Username",
        () => {
            records.filter(r => r["Scenario"] === "invalid_email")
                .forEach((record, index) => {

                test(`[${index}] ${record["Test_ID"]}`, async ({loginPage}) => {

                    try {
                        await loginPage.verifyLoginInput(testData.invalid_username, testData.valid_password);
                        invalid_message = await loginPage.verifyErrorMessage()
                        expect(invalid_message).toEqual('email or password is invalid')
                        // @ts-ignore
                        updateCsv(csvPath, record["Test_ID"], record["Scenario"], record["Test_Name"], "Pass");

                    } catch (err) {
                        // @ts-ignore
                        updateCsv(csvPath, record["Test_ID"], record["Scenario"], record["Test_Name"], "Fail");
                        throw err;
                    }
                });
            })
        })
    test.describe("Invalid Password",
        () => {
            records.filter(r => r["Scenario"] === "invalid_password")
                .forEach((record, index) => {
                    test(`[${index}] ${record["Test_ID"]}`, async ({loginPage}) => {
                        console.log(Object.keys(records[0] || {}));

                        try {
                            await loginPage.verifyLoginInput(testData.username, testData.invalid_password);
                            invalid_message = await loginPage.verifyErrorMessage()
                            console.log(invalid_message)
                            expect(invalid_message).toEqual('email or password is invalid')
                            // @ts-ignore
                            updateCsv(csvPath, record["Test_ID"], record["Scenario"], record["Test_Name"], "Pass");
                        } catch (err) {
                            // @ts-ignore
                            updateCsv(csvPath, record["Test_ID"], record["Scenario"], record["Test_Name"], "Fail");
                            throw err;
                        }
                    });
                })
        })

    test.describe("Valid User", () => {
        records.filter(r => r["Scenario"] === "valid email and password")
            .forEach((record, index) => {
                test(`[${index}] ${record["Test_ID"]} ${record["Scenario"]} `, async ({loginPage, request, page}) => {

                    try {
                        await loginPage.verifyLoginInput(testData.username, testData.password);
                        const apiUser = await getUserFromApi(request);
                        const uiUsername = await page.textContent(
                            `.nav-link[href="/profile/${apiUser.username}"]`
                        );
                        expect(uiUsername?.trim()).toBe(apiUser.username);
                        // @ts-ignore
                        updateCsv(csvPath, record["Test_ID"], record["Scenario"], record["Test_Name"], "Pass");
                    } catch (err) {
                        // @ts-ignore
                        updateCsv(csvPath, record["Test_ID"], record["Scenario"], record["Test_Name"], "Fail");
                        throw err;
                    }

                })
            });
    })
})

