import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

export class LandingPage extends BasePage {
  readonly page: Page;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.signInButton = page.locator("//a[normalize-space()='Sign in']");
  }

  async clickSignInButton(): Promise<void> {
    await this.clickElement(this.signInButton);
  }

  async ensureSignInButtonIsVisible(): Promise<void> {
    await expect(this.signInButton).toBeVisible();
  }
}
