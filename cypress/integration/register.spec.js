describe('Creating new user', () => {

  beforeEach(() => {
    cy.request('GET', 'http://localhost:3001/api/testing/resetdb');
    cy.visit('http://localhost:3000');
    cy.contains('Sign Up').click();
  });

  it('works when valid credentials are given', () => {
    cy.contains('Create new account');
    cy.get('#email').type('testemail@gmail.com');
    cy.get('#username').type('testusername');
    cy.get('#password').type('testpassword');
    cy.get('#confirmPassword').type('testpassword');
    cy.get('#registerButton').click();
    
    cy.wait(2000)
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('User created!');
    });
  });

  it('fails when non unique username is given', () => {
    const testUser = {
      email: 'testemail@gmail.com',
      username: 'testusername',
      password: "testpassword",
    } 
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)
    
    cy.contains('Create new account');
    cy.get('#email').type('testemail@gmail.com');
    cy.get('#username').type('testusername');
    cy.get('#password').type('testpassword');
    cy.get('#confirmPassword').type('testpassword');
    cy.get('#registerButton').click();
    
    cy.wait(2000)
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.not.equal('User created!');
    });
  });

  it('cannot be done if non matching passwords are given', () => {
    cy.contains('Create new account');
    cy.get('#email').type('testemail@gmail.com');
    cy.get('#username').type('testusername');
    cy.get('#password').type('testpassword');
    cy.get('#confirmPassword').type('wrongpassword');
    cy.get('#registerButton').should('be.disabled');
  });

});
