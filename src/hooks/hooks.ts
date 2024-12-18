/* Hooks in cucumber are the functions or code blocks that allows you to perform
actions before or after certain events in the cucumber scenarios. 
Six in total: 
Before All: It is executed first for exmaple used to set up multiple browsers
Before: It will be exceute before each scenario in the feature file
Before Step: Actions that should beexceuted before a each step in the scenario
After Step: After each step in the scenario actions after each step
After:  After exceution of each scenario .. clena up task
After ALl: After all the exectuion last thing ... Teardown of browsers for 
*/

// Before and After hook for Cucumber test cases
// as we need to handle the same Page object (playwright object) accross
// different step definitions.
import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, Page, chromium, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let page: Page;
let context: BrowserContext;

// We should create only one browser cause it is really expensive to create each time
BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

// We need to use normal function declarations cause cucumber sometimes
// throws errors with arrow functions
Before(async function () {
  // for each scenario it is better to create a new context instead of new browser
  context = await browser.newContext();
  page = await browser.newPage();
  pageFixture.page = page;
});

After(async function () {
  await page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
