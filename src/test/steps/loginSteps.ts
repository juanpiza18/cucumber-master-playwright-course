import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import { LandingPage, SignInPage, HomePage, SettingsPage } from "../pages";

/*let browser: Browser;
let page: Page;*/

/* We need to declare the objects globally but this will cause an issue.
 cause the objects will be undefined for the scope
 cannot read properties of undefined reading locator
*/
let landingPage: LandingPage;
let singInPage: SignInPage;
let homePage: HomePage;
let settingsPage: SettingsPage;

Given("I am on the conduit login page", async function () {
  /* browser = await chromium.launch({ headless: false });
  page = await browser.newPage();*/
  /*await pageFixture.page.goto("https://react-redux.realworld.io/");
  await pageFixture.page.locator("//a[normalize-space()='Sign in']").click();*/
  /** In the Given statement it is recommended to declare the variables */
  landingPage = new LandingPage(pageFixture.page);
  singInPage = new SignInPage(pageFixture.page);
  homePage = new HomePage(pageFixture.page);
  settingsPage = new SettingsPage(pageFixture.page);
  await landingPage.navigateTo("https://react-redux.realworld.io/");
  await landingPage.clickSignInButton();
});

When("I login with valid credentials", async function () {
  /*const emailInput = pageFixture.page.locator("input[placeholder='Email']");
  const passwordInput = pageFixture.page.locator(
    "input[placeholder='Password']"
  );
  const signInButton = pageFixture.page.locator("button[type='submit']");

  await emailInput.fill("playwrightdemo@gmail.com");
  await passwordInput.fill("playwrightdemo");
  await signInButton.click();*/
  await singInPage.signInWithEmailAndPassword(
    "playwrightdemo@gmail.com",
    "playwrightdemo"
  );
});

When("I click on the settings button", async function () {
  // await pageFixture.page.locator("a[href='#settings']").click();
  await homePage.clickSettingsButton();
});

When("I click on the logout button", async function () {
  /*await pageFixture.page
    .locator("//button[normalize-space()='Or click here to logout.']")
    .click();*/
  await settingsPage.clickLogoutButton();
});

Then("I route back to the login page", async function () {
  /*await expect(
    pageFixture.page.locator("//a[normalize-space()='Sign in']")
  ).toBeVisible();*/
  await landingPage.ensureSignInButtonIsVisible();
});
