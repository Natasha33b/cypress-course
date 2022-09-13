import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    specPattern: "cypress/e2e/*.js",
    excludeSpecPattern: ["**/2-advanced-examples/*", "**/1-*/*"],
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
});
