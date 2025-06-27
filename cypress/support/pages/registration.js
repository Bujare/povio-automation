export const registrationPage = {
  visit() {
    cy.visit('/users/sign_up');
    cy.contains('Sign up').should('be.visible');
  },

  fillForm(userData) {
    cy.get('input[name="user[name]"]')
      .should('be.visible')
      .clear()
      .type(userData.name);

    cy.get('input[name="user[email]"]')
      .should('be.visible')
      .clear()
      .type(userData.email);

    cy.get('input[name="user[password]"]')
      .should('be.visible')
      .clear()
      .type(userData.password);

    cy.get('input[name="user[password_confirmation]"]')
      .should('be.visible')
      .clear()
      .type(userData.passwordConfirmation);
  },

  submit() {
    cy.get('input[type="submit"][value="Sign up"]')
      .should('be.visible')
      .click();
  },

  verifySuccessfulRegistration() {
    cy.get('body').should('contain.text', 'Welcome! You have signed up successfully.');
  },

  verifyRegistrationError(errorMessage) {
    cy.get('body').then(($body) => {
      const normalizedText = $body.text().replace(/\s+/g, ' ').trim();
      const normalizedError = errorMessage.replace(/\s+/g, ' ').trim();
      expect(normalizedText).to.include(normalizedError);
    });
  },

  goToLogin() {
    cy.contains('Sign in').click();
  },

  verifyFieldValidation(fieldName, expectedMessage) {
    cy.get(`input[name="user[${fieldName}]"]`).then(($input) => {
      expect($input[0].validationMessage).to.contain(expectedMessage);
    });
  },

  verifyStaysOnRegistrationPage() {
    cy.url().should('satisfy', (url) => {
      return url.includes('/users/sign_up') || url.includes('/users');
    });
  },

  attemptRegistration(userData) {
    this.visit();
    this.fillForm(userData);
    this.submit();
  },

  registerNewUser(userData) {
    this.attemptRegistration(userData);
    this.verifySuccessfulRegistration();
  },

  attemptInvalidRegistration(userData, expectedError) {
    this.attemptRegistration(userData);
    this.verifyRegistrationError(expectedError);
    this.verifyStaysOnRegistrationPage();
  },

  attemptEmptyFormSubmission() {
    this.visit();
    this.submit();
    this.verifyStaysOnRegistrationPage();
  },

  verifyFormValidation(userData, expectedError) {
    this.visit();
    this.fillForm(userData);
    this.submit();
    this.verifyRegistrationError(expectedError);
    this.verifyStaysOnRegistrationPage();
  }
};
