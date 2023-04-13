import { defineConfig } from "cypress";
import admin from "firebase-admin";
import { plugin as cypressFirebasePlugin } from "cypress-firebase";

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  projectId: "1jicua",
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      // implement node event listeners here

      // return config;
      return cypressFirebasePlugin(on, config, admin);
    },
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
