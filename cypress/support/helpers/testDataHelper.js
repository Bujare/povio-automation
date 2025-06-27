export class TestDataHelper {
  static getExistingUser() {
    return {
      name: Cypress.env('TEST_USER_NAME'),
      email: Cypress.env('EXISTING_USER_EMAIL'),
      password: Cypress.env('EXISTING_USER_PASSWORD'),
      passwordConfirmation: Cypress.env('EXISTING_USER_PASSWORD')
    };
  }

  static getWrongPassUser() {
    return {
      name: Cypress.env('TEST_USER_NAME'),
      email: this.getEmail(),
      password: Cypress.env('VALID_PASSWORD'),
      passwordConfirmation: Cypress.env('MISMATCHED_PASSWORD')
    };
  }

  static getInvalidEmailUser() {
    return {
      name: Cypress.env('TEST_USER_NAME'),
      email: Cypress.env('INVALID_EMAIL'),
      password: Cypress.env('VALID_PASSWORD'),
      passwordConfirmation: Cypress.env('VALID_PASSWORD')
    };
  }

  static getEmail() {
    const r = Math.floor(Math.random() * 10000);
    return `test${r}@test.com`;
  }

  static getNewUser() {
    return {
      name: Cypress.env('TEST_USER_NAME'),
      email: this.getEmail(),
      password: Cypress.env('VALID_PASSWORD'),
      passwordConfirmation: Cypress.env('VALID_PASSWORD')
    };
  }

  static getErrors() {
    return {
      emailAlreadyTaken: 'Email has already been taken',
      passwordMismatch: 'doesn\'t match',
      invalidEmail: 'invalid',
      requiredField: 'required'
    };
  }

  static checkEnv() {
    const vars = [
      'EXISTING_USER_EMAIL',
      'EXISTING_USER_PASSWORD', 
      'TEST_USER_NAME',
      'VALID_PASSWORD'
    ];

    const missing = vars.filter(v => !Cypress.env(v));
    
    if (missing.length > 0) {
      throw new Error(`Missing: ${missing.join(', ')}`);
    }
  }
}
