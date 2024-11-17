const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      allureCypress(on);
      return config;
      // implement node event listeners here
    },
    specPattern: "cypress/integration/*.feature",
  },
});
