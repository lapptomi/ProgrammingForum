import { testUser, baseUrl } from '../constants';

describe('Creating new user', async () => {
  beforeEach(() => {
    cy.request('POST', `${baseUrl}/api/testing/resetdb`);

    cy.visit(`${baseUrl}`);
    cy.clearLocalStorage();
    cy.reload();
    
    cy.get('#navbarSignUpButton').click();
    cy.contains('CREATE NEW ACCOUNT');
  });

  it('works when valid credentials are given', () => {
    cy.get('#email').type(testUser.email);
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#confirmPassword').type(testUser.password);
    cy.get('#registerButton').click();
    
    cy.contains('PROFILE')
  });

  it('fails when non unique username is given', () => {
    cy.request('POST', `${baseUrl}/api/users`, testUser)
    
    cy.get('#email').type(testUser.email);
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#confirmPassword').type(testUser.password);
    cy.get('#registerButton').click();
    
    cy.contains('CREATE NEW ACCOUNT');
  });

  it('cannot be done if non matching passwords are given', () => {
    cy.get('#email').type(testUser.email);
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#confirmPassword').type('wrongpassword');
    cy.get('#registerButton').should('be.disabled');
  });

});
