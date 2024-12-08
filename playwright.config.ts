import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "https://www.saucedemo.com",
    headless: true,
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },
  reporter: [["list"], ["html", { outputFolder: "report" }]],
});
