Cypress.Commands.add('login', () => {
  cy.session('authSession', () => {
    cy.visit('/users/sign_in');

    cy.get('input[name="user[email]"]', { timeout: 10000 }).should('be.visible').type(Cypress.env('EMAIL'));
    cy.get('input[name="user[password]"]', { timeout: 10000 }).should('be.visible').type(Cypress.env('PASSWORD'));
    cy.get('input[name="commit"]').should('be.visible').click();

    cy.contains('Campaigns', { timeout: 10000 }).should('be.visible');
  });
});

// Excel Reporter Commands
Cypress.Commands.add('initExcelReporter', () => {
  cy.task('initExcelReporter');
});

Cypress.Commands.add('addTestResult', (testData) => {
  cy.task('addTestResult', testData);
});

Cypress.Commands.add('generateExcelReport', () => {
  cy.task('generateExcelReport');
});
