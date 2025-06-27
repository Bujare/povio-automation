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
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    TEST_USER_NAME: process.env.TEST_USER_NAME,
    EXISTING_USER_EMAIL: process.env.EXISTING_USER_EMAIL,
    EXISTING_USER_PASSWORD: process.env.EXISTING_USER_PASSWORD,
    INVALID_EMAIL: process.env.INVALID_EMAIL,
    VALID_PASSWORD: process.env.VALID_PASSWORD,
    MISMATCHED_PASSWORD: process.env.MISMATCHED_PASSWORD,
    CAMPAIGN_NAME: process.env.CAMPAIGN_NAME,
    CAMPAIGN_DESCRIPTION: process.env.CAMPAIGN_DESCRIPTION
  }
});
