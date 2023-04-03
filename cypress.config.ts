import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      // implement node event listeners here

      return config;
    },
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
