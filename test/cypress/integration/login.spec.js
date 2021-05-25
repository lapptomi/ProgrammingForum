import { testUser, nonExistingUser, baseUrl } from '../constants';

describe('Sign in', () => {
  beforeEach(() => {
    cy.request('POST', `${baseUrl}/api/testing/resetdb`);

    // creating user for testing
    cy.request('POST', `${baseUrl}/api/users`, testUser)
    
    cy.visit('http://localhost:3000');

    cy.wait(1000);
    cy.get('#navbarSignInButton').click();
  });

  it('works with correct credentials', () => {
    cy.contains('SIGN IN TO YOUR ACCOUNT');
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    cy.wait(1000);
    cy.contains('PROFILE');
    cy.contains('CREATE NEW POST');
  });

  it('fails with invalid credentials', () => {
    cy.contains('SIGN IN TO YOUR ACCOUNT');
    cy.get('#username').type(testUser.username);
    cy.get('#password').type('wrongpassword');
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    cy.wait(1000)
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Invalid username or password');
    });
  });

  it('fails when user with username given does not exist', () => {
    cy.contains('SIGN IN TO YOUR ACCOUNT');
    cy.get('#username').type(nonExistingUser.username);
    cy.get('#password').type(nonExistingUser.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    cy.wait(1000)
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('User not found');
    });
  });
});
