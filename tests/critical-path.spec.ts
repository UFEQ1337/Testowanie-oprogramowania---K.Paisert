import { test, expect } from "@playwright/test";

test.describe("Testy ścieżek krytycznych", () => {
  // 1. Logowanie poprawne i weryfikacja listy produktów
  test("Poprawne logowanie i sprawdzenie listy produktów", async ({ page }) => {
    await page.goto("/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page.locator(".inventory_item")).not.toHaveCount(0);
  });

  // 2. Dodanie produktu do koszyka
  test("Dodanie produktu do koszyka", async ({ page }) => {
    await page.goto("/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    await page.click("text=Add to cart", { timeout: 2000 });
    await page.click(".shopping_cart_link");
    await expect(page.locator(".cart_item")).toHaveCount(1);
  });

  // 3. Usunięcie produktu z koszyka
  test("Usunięcie produktu z koszyka", async ({ page }) => {
    await page.goto("/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    await page.click("text=Add to cart");
    await page.click(".shopping_cart_link");
    await expect(page.locator(".cart_item")).toHaveCount(1);

    await page.click("text=Remove");
    await expect(page.locator(".cart_item")).toHaveCount(0);
  });

  // 4. Sprawdzenie ceny i nazwy produktu w koszyku
  test("Weryfikacja ceny i nazwy produktu", async ({ page }) => {
    await page.goto("/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    await page.click("text=Add to cart");
    await page.click(".shopping_cart_link");

    const productName = await page
      .locator(".inventory_item_name")
      .textContent();
    const productPrice = await page
      .locator(".inventory_item_price")
      .textContent();

    expect(productName).toContain("Sauce Labs Backpack");
    expect(productPrice).toMatch(/\$\d+\.\d{2}/);
  });

  // 5. Przejście do checkout i weryfikacja strony checkout
  test("Przejście do checkout i weryfikacja formularza danych", async ({
    page,
  }) => {
    await page.goto("/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    await page.click("text=Add to cart");
    await page.click(".shopping_cart_link");
    await page.click("text=Checkout");

    await expect(page.locator("#first-name")).toBeVisible();
    await expect(page.locator("#last-name")).toBeVisible();
    await expect(page.locator("#postal-code")).toBeVisible();
  });
});
