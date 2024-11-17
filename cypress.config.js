const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // You can keep your setupNodeEvents code here if necessary
      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.js", // Updated to match your test files
  },
});
