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
import {
  After,
  AfterAll,
  AfterStep,
  Before,
  BeforeAll,
  Status,
} from "@cucumber/cucumber";
import { Browser, Page, chromium, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let page: Page;
let context: BrowserContext;

// We should create only one browser cause it is really expensive to create each time
BeforeAll(async function () {
  try {
    console.log("Launching browser...");
    browser = await chromium.launch({ headless: true });
    console.log("Browser launched successfully");
  } catch (error) {
    console.error("Error launching browser:", error);
    throw error;
  }
});

// We need to use normal function declarations cause cucumber sometimes
// throws errors with arrow functions
Before(async function () {
  try {
    console.log("Creating browser context and page...");
    context = await browser.newContext();
    page = await context.newPage();
    pageFixture.page = page; // Share page object using the fixture
    console.log("Context and page created successfully");
  } catch (error) {
    console.error("Error creating context or page:", error);
    throw error;
  }
});

After(async function () //{ result, pickle }
{
  // add screenshot for the failures scenario.
  // get test that failed
  /*if (result.status === Status.FAILED) {
    const image = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    this.attach(image, "image/png");
  }*/

  // Screenshot after each scenario
  /*const image = await pageFixture.page.screenshot({
    path: `./test-results/screenshots/${pickle.name}.png`,
    type: "png",
  });
  this.attach(image, "image/png");*/
  try {
    console.log("Closing page and context...");
    if (page) await page.close();
    if (context) await context.close();
    console.log("Page and context closed successfully");
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
});

AfterAll(async function () {
  try {
    console.log("Closing browser...");
    if (browser) await browser.close();
    console.log("Browser closed successfully");
  } catch (error) {
    console.error("Error closing browser:", error);
  }
});

// Take a Screenshot after each step
AfterStep(async function ({ pickle }) {
  try {
    console.log(`Taking screenshot after step in scenario: ${pickle.name}`);
    const image = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    this.attach(image, "image/png");
    console.log("Screenshot captured");
  } catch (error) {
    console.error("Error taking screenshot:", error);
  }
});
