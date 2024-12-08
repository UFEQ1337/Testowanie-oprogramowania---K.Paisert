import { test, expect } from "@playwright/test";

test.describe("Testy klas równoważności i wartości brzegowych dla logowania", () => {
  // 1. Logowanie poprawnymi danymi
  test("Poprawne dane logowania", async ({ page }) => {
    await page.goto("/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page.locator(".inventory_item")).not.toHaveCount(0);
  });

  // 2. Logowanie z nieistniejącym użytkownikiem
  test("Logowanie z nieistniejącym użytkownikiem", async ({ page }) => {
    await page.goto("/");
    await page.fill("#user-name", "non_existent_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page.locator('h3[data-test="error"]')).toContainText(
      "Username and password do not match"
    );
  });

  // 3. Logowanie z pustym polem hasła
  test("Logowanie bez hasła", async ({ page }) => {
    await page.goto("/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "");
    await page.click("#login-button");
    await expect(page.locator('h3[data-test="error"]')).toContainText(
      "Password is required"
    );
  });

  // 4. Logowanie z pustymi polami
  test("Logowanie bez loginu i hasła", async ({ page }) => {
    await page.goto("/");
    await page.fill("#user-name", "");
    await page.fill("#password", "");
    await page.click("#login-button");
    await expect(page.locator('h3[data-test="error"]')).toContainText(
      "Username is required"
    );
  });

  // 5. Logowanie z poprawnym loginem, ale złym hasłem
  test("Złe hasło dla poprawnego loginu", async ({ page }) => {
    await page.goto("/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "wrong_password");
    await page.click("#login-button");
    await expect(page.locator('h3[data-test="error"]')).toContainText(
      "Username and password do not match"
    );
  });
});
