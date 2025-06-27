import { registrationPage } from '../support/pages/registration';
import { TestDataHelper } from '../support/helpers/testDataHelper';

describe('Registration', () => {
  before(() => {
    TestDataHelper.checkEnv();
  });

  it('should prevent registration with an existing email', () => {
    const existingUserData = TestDataHelper.getExistingUser();
    const errorMessages = TestDataHelper.getErrors();

    registrationPage.attemptInvalidRegistration(existingUserData, errorMessages.emailAlreadyTaken);
  });

  it('should prevent registration when passwords do not match', () => {
    const invalidUserData = TestDataHelper.getWrongPassUser();
    const errorMessages = TestDataHelper.getErrors();

    registrationPage.verifyFormValidation(invalidUserData, errorMessages.passwordMismatch);
  });

  it('should prevent registration with invalid email format', () => {
    const invalidUserData = TestDataHelper.getInvalidEmailUser();

    registrationPage.attemptRegistration(invalidUserData);
    registrationPage.verifyStaysOnRegistrationPage();
  });

  it('should prevent registration with empty required fields', () => {
    registrationPage.attemptEmptyFormSubmission();
  });

  it('should successfully register a new valid user', () => {
    const newUserData = TestDataHelper.getNewUser();

    registrationPage.registerNewUser(newUserData);
  });
});
