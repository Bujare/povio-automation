import './commands';

let testStartTime;

beforeEach(() => {
  testStartTime = Date.now();
});

afterEach(function() {
  const testDuration = Date.now() - testStartTime;
  const testContext = this.currentTest;
  
  const testData = {
    suite: testContext.parent.title,
    title: testContext.title,
    fullTitle: testContext.fullTitle(),
    status: testContext.state || 'unknown',
    duration: testDuration,
    startTime: new Date(testStartTime).toLocaleString(),
    endTime: new Date().toLocaleString(),
    browser: Cypress.browser.name,
    browserVersion: Cypress.browser.version,
    viewport: `${Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')}`,
    testFile: Cypress.spec.relative,
    url: Cypress.config('baseUrl'),
    error: testContext.err ? {
      message: testContext.err.message,
      name: testContext.err.name
    } : null
  };

  cy.task('addTestResult', testData);
});

before(() => {
  cy.task('initExcelReporter');
});

after(() => {
  cy.task('generateExcelReport');
});