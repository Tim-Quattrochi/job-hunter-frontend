import { expect, test } from "@playwright/test";

const TEST_EMAIL = "qa-user@example.com";

test("user can register and reach dashboard", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Sign Up" }).click();
  await expect(page).toHaveURL(/\/handler\/signup/);

  await page.getByLabel("Full name").fill("QA User");
  await page.getByLabel("Email").fill(TEST_EMAIL);
  await page.getByLabel("Password").fill("Password123");

  await page.getByRole("button", { name: "Create Account" }).click();

  await page.waitForURL("**/dashboard");
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByTestId("free-swipes-count")).toHaveText("10");
  await expect(page.getByTestId("paid-credits-count")).toHaveText("0");
  await expect(page.getByTestId("total-swipes-count")).toHaveText("10");
});
