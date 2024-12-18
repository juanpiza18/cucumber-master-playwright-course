import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

/*let browser: Browser;
let page: Page;*/

Given("I am on the conduit login page", async function () {
  /* browser = await chromium.launch({ headless: false });
  page = await browser.newPage();*/
  await pageFixture.page.goto("https://react-redux.realworld.io/");
  await pageFixture.page.locator("//a[normalize-space()='Sign in']").click();
});

When("I login with valid credentials", async function () {
  const emailInput = pageFixture.page.locator("input[placeholder='Email']");
  const passwordInput = pageFixture.page.locator(
    "input[placeholder='Password']"
  );
  const signInButton = pageFixture.page.locator("button[type='submit']");

  await emailInput.fill("playwrightdemo@gmail.com");
  await passwordInput.fill("playwrightdemo");
  await signInButton.click();
});

When("I click on the settings button", async function () {
  await pageFixture.page.locator("a[href='#settings']").click();
});

When("I click on the logout button", async function () {
  await pageFixture.page
    .locator("//button[normalize-space()='Or click here to logout.']")
    .click();
});

Then("I route back to the login page", async function () {
  await expect(
    pageFixture.page.locator("//a[normalize-space()='Sign in']")
  ).toBeVisible();
});
