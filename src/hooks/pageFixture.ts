import { Page } from "@playwright/test";

type PageFixture = {
  page: Page;
};

export const pageFixture: PageFixture = {
  page: undefined,
};
