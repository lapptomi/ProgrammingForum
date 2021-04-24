describe('Sign in', () => {
  beforeEach(() => {
    cy.request('GET', 'http://localhost:3001/api/testing/resetdb');

    // creating user for testing
    const testUser = {
      email: 'testemail@gmail.com',
      username: 'testusername',
      password: "testpassword",
    }
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)

    cy.visit('http://localhost:3000');
    cy.contains('Sign in').click();
  });

  it('works with correct credentials', () => {
    cy.contains('Sign in to your account');
    cy.get('#username').type('testusername');
    cy.get('#password').type('testpassword');
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    cy.wait(2000);
    cy.contains('Profile');
    cy.contains('Create New Post');
  });

  it('fails with invalid credentials', () => {
    cy.contains('Sign in to your account');
    cy.get('#username').type('testusername');
    cy.get('#password').type('wrongpassword');
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    cy.wait(2000)
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Error logging in');
    });
  });
});
