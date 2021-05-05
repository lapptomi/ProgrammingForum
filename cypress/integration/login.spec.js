const testUser = {
  email: 'testemail@gmail.com',
  username: 'testusername',
  password: "testpassword",
};

const nonExistingUser = {
  email: 'randomuser@gmail.com',
  username: 'invalidusername',
  password: "invalidpassword",
};

describe('Sign in', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/resetdb');

    // creating user for testing
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)
    cy.visit('http://localhost:3000');

    cy.wait(1000);
    cy.get('#navbarSignInButton').click();
  });

  it('works with correct credentials', () => {
    cy.contains('Sign in to your account');
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    cy.wait(2000);
    cy.contains('Profile');
    cy.contains('Create New Post');
  });

  it('fails with invalid credentials', () => {
    cy.contains('Sign in to your account');
    cy.get('#username').type(testUser.username);
    cy.get('#password').type('wrongpassword');
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    cy.wait(2000)
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Invalid username or password');
    });
  });

  it('fails when user with username given does not exist', () => {
    cy.contains('Sign in to your account');
    cy.get('#username').type(nonExistingUser.username);
    cy.get('#password').type(nonExistingUser.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    cy.wait(2000)
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain(`No user found with username: ${nonExistingUser.username}`);
    });
  });
});
