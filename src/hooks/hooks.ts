// Before all and After ALl hook for Cucumber test cases
// as we need to handle the same Page object (playwright object) accross
// different step definitions.
import { After, Before } from "@cucumber/cucumber";
import { Browser, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let page: Page;

// We need to use normal function declarations cause cucumber sometimes
// throws errors with arrow functions
Before(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  pageFixture.page = page;
});

After(async function () {
  await page.close();
  await browser.close();
});
