import { registrationPage } from '../support/pages/registration';
import { TestDataHelper } from '../support/helpers/testDataHelper';

describe('Registration', () => {
  before(() => {
    TestDataHelper.validateEnvironmentVariables();
  });

  it('should prevent registration with an existing email', () => {
    const existingUserData = TestDataHelper.getExistingUser();
    const errorMessages = TestDataHelper.getErrorMessages();

    registrationPage.visit();
    registrationPage.fillForm(existingUserData);
    registrationPage.submit();

    registrationPage.verifyRegistrationError(errorMessages.emailAlreadyTaken);
    registrationPage.verifyStaysOnRegistrationPage();
  });

  it('should prevent registration with mismatched passwords', () => {
    const invalidUserData = TestDataHelper.getUserWithMismatchedPasswords();
    const errorMessages = TestDataHelper.getErrorMessages();

    registrationPage.visit();
    registrationPage.fillForm(invalidUserData);
    registrationPage.submit();

    registrationPage.verifyRegistrationError(errorMessages.passwordMismatch);
    registrationPage.verifyStaysOnRegistrationPage();
  });

  it('should prevent registration with invalid email format', () => {
    const invalidUserData = TestDataHelper.getUserWithInvalidEmail();

    registrationPage.visit();
    registrationPage.fillForm(invalidUserData);
    registrationPage.submit();

    registrationPage.verifyStaysOnRegistrationPage();
  });

  it('should prevent registration with empty required fields', () => {
    registrationPage.visit();
    registrationPage.submit();

    registrationPage.verifyStaysOnRegistrationPage();
  });

  it('should successfully register a new valid user', () => {
    const newUserData = TestDataHelper.getValidNewUser();

    registrationPage.visit();
    registrationPage.fillForm(newUserData);
    registrationPage.submit();

    registrationPage.verifySuccessfulRegistration();
  });
});
