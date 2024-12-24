import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

export class SignInPage extends BasePage {
  readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.emailInput = page.locator("input[placeholder='Email']");
    this.passwordInput = page.locator("input[placeholder='Password']");
    this.signInButton = page.locator("button[type='submit']");
  }

  async enterEmail(email: string): Promise<void> {
    await this.fillFormField(this.emailInput, email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fillFormField(this.passwordInput, password);
  }

  async clickSignInButton(): Promise<void> {
    await this.clickElement(this.signInButton);
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignInButton();
  }
}
