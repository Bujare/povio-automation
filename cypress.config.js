const { defineConfig } = require("cypress");

require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://povio-at.herokuapp.com",
    setupNodeEvents(on, config) {

      on('task', {
        initExcelReporter() {
          const { ExcelReporter } = require('./cypress/support/reporters/excelReporter.js');
          global.excelReporter = new ExcelReporter();
          return null;
        },
        addTestResult(testData) {
          if (global.excelReporter) {
            global.excelReporter.addTestResult(testData);
          }
          return null;
        },
        generateExcelReport() {
          if (global.excelReporter) {
            return global.excelReporter.generateReport();
          }
          return null;
        }
      });
      return config;
    },
    video: true,
    videoCompression: 32,
    videosFolder: 'cypress/videos',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      reportFilename: '[name]-report',
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveHtml: true,
      saveJson: true,
      code: false
    }
  },

  env: {
    EMAIL: process.env.CYPRESS_TEST_USER_EMAIL,
    PASSWORD: process.env.CYPRESS_TEST_USER_PASSWORD,
    TEST_USER_NAME: process.env.CYPRESS_TEST_USER_NAME,
    EXISTING_USER_EMAIL: process.env.CYPRESS_EXISTING_USER_EMAIL,
    EXISTING_USER_PASSWORD: process.env.CYPRESS_EXISTING_USER_PASSWORD,
    INVALID_EMAIL: process.env.CYPRESS_INVALID_EMAIL,
    VALID_PASSWORD: process.env.CYPRESS_VALID_PASSWORD,
    MISMATCHED_PASSWORD: process.env.CYPRESS_MISMATCHED_PASSWORD,
    CAMPAIGN_NAME: process.env.CYPRESS_CAMPAIGN_NAME,
    CAMPAIGN_DESCRIPTION: process.env.CYPRESS_CAMPAIGN_DESCRIPTION
  }
});
