export const registrationPage = {
  visit() {
    cy.visit('/users/sign_up');
    cy.contains('Sign up', { timeout: 10000 }).should('be.visible');
  },

  fillForm(userData) {
    cy.get('input[name="user[name]"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(userData.name);

    cy.get('input[name="user[email]"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(userData.email);

    cy.get('input[name="user[password]"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(userData.password);

    cy.get('input[name="user[password_confirmation]"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(userData.passwordConfirmation);
  },

  submit() {
    cy.get('input[type="submit"][value="Sign up"]', { timeout: 10000 })
      .should('be.visible')
      .click();
  },

  verifySuccessfulRegistration() {
    cy.get('body').should('contain.text', 'Welcome! You have signed up successfully.');
  },

  verifyRegistrationError(errorMessage) {
    cy.get('body', { timeout: 10000 }).then(($body) => {
      const normalizedText = $body.text().replace(/\s+/g, ' ').trim();
      const normalizedError = errorMessage.replace(/\s+/g, ' ').trim();
      expect(normalizedText).to.include(normalizedError);
    });
  },

  goToLogin() {
    cy.contains('Sign in', { timeout: 10000 }).click();
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
  }
};
