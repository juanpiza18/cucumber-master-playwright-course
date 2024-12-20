import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

Given("I am on the orange hrm login page", async function () {
  await pageFixture.page.goto("https://opensource-demo.orangehrmlive.com");
});

When(
  "I login with username as {string} and password as {string}",
  async function (username: string, password: string) {
    await pageFixture.page.locator('[name="username"]').fill(username);
    await pageFixture.page.locator('[name="password"]').fill(password);
  }
);

When("I click on the login button", async function () {
  await pageFixture.page.locator('[type="submit"]').click();
});

Then("I route to the orange HRM home page", async function () {
  const url = pageFixture.page.url();
  expect(url).toBe(
    "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
  );
});
