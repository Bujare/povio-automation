import { healthCheckPage } from '../support/pages/healthcheck';

describe('Health Check', () => {
  it('should load app and be accessible', () => {
    healthCheckPage.performHealthCheck();
    healthCheckPage.verifyAppIsRunning();
  });
  
  it('should have working navigation links', () => {
    healthCheckPage.performHealthCheck();
    healthCheckPage.verifyNavigationLinks();
  });
  
  it('should load critical pages without errors', () => {
    healthCheckPage.checkLoginPage();
    healthCheckPage.checkRegistrationPage(); 
    healthCheckPage.performHealthCheck();
  });
  
  it('should have no JavaScript console errors', () => {
    healthCheckPage.checkForConsoleErrors();
  });
});
