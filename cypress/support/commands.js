Cypress.Commands.add('login', () => {
  cy.session('authSession', () => {
    cy.visit('/users/sign_in');

    cy.get('input[name="user[email]"]').should('be.visible').type(Cypress.env('EMAIL'));
    cy.get('input[name="user[password]"]').should('be.visible').type(Cypress.env('PASSWORD'));
    cy.get('input[name="commit"]').should('be.visible').click();

    cy.contains('Campaigns').should('be.visible');
  });
});

Cypress.Commands.add('initExcelReporter', () => {
  cy.task('initExcelReporter');
});

Cypress.Commands.add('addTestResult', (testData) => {
  cy.task('addTestResult', testData);
});

Cypress.Commands.add('generateExcelReport', () => {
  cy.task('generateExcelReport');
});
