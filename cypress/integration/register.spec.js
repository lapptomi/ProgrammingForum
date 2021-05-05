const testUser = {
  email: 'testemail@gmail.com',
  username: 'testusername',
  password: "testpassword",
} 

describe('Creating new user', () => {

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/resetdb');
    cy.visit('http://localhost:3000');

    cy.wait(1000);
    cy.get('#navbarSignUpButton').click();
    cy.contains('Create a new account');
  });

  it('works when valid credentials are given', () => {
    cy.get('#email').type(testUser.email);
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#confirmPassword').type(testUser.password);
    cy.get('#registerButton').click();
    
    cy.wait(2000)
    cy.contains('Profile')
  });

  it('fails when non unique username is given', () => {
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)
    
    cy.get('#email').type(testUser.email);
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#confirmPassword').type(testUser.password);
    cy.get('#registerButton').click();
    
    cy.wait(2000)
    cy.contains('Create a new account');
  });

  it('cannot be done if non matching passwords are given', () => {
    cy.get('#email').type(testUser.email);
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#confirmPassword').type('wrongpassword');
    cy.get('#registerButton').should('be.disabled');
  });

});
