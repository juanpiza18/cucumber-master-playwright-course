import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

export class HomePage extends BasePage {
  readonly page: Page;
  private readonly settingsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.settingsButton = page.locator("a[href='#settings']");
  }

  async clickSettingsButton(): Promise<void> {
    await this.clickElement(this.settingsButton);
  }
}
