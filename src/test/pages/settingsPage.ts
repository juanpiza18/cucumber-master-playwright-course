import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

export class SettingsPage extends BasePage {
  readonly page: Page;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.logoutButton = page.locator("//button[normalize-space()='']");
  }

  async clickLogoutButton(): Promise<void> {
    await this.clickElement(this.logoutButton);
  }
}
