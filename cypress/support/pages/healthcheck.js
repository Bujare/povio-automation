export const healthCheckPage = {
  performHealthCheck() {
    cy.visit('/');
    cy.url().should('include', 'povio-at.herokuapp.com');
    cy.get('body').should('be.visible');
  },

  verifyAppIsRunning() {
    cy.contains('Welcome').should('exist');
  },

  verifyNavigationLinks() {
    cy.contains('Home').should('be.visible');
    cy.contains('Sign in').should('be.visible');
    cy.contains('Sign up').should('be.visible');
    
    cy.contains('Sign in').click();
    cy.url().should('include', '/users/sign_in');
    
    cy.go('back');
    cy.contains('Sign up').click();
    cy.url().should('include', '/users/sign_up');
    
    cy.go('back');
  },

  checkLoginPage() {
    cy.visit('/users/sign_in');
    cy.get('body').should('be.visible');
    cy.contains('Sign in').should('be.visible');
  },

  checkRegistrationPage() {
    cy.visit('/users/sign_up');
    cy.get('body').should('be.visible');
    cy.contains('Sign up').should('be.visible');
  },

  checkForConsoleErrors() {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      }
    });
    
    cy.contains('Sign in').click();
    cy.go('back');
    cy.contains('Sign up').click();
    cy.go('back');
    
    cy.get('@consoleError').should('not.have.been.called');
  }
};
