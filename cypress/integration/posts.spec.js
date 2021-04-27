const testPost = {
  title: 'randomtitle',
  description: 'randomdescription'
};

describe('Creating new post', () => {

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/resetdb');

    // creating user for testing
    const testUser = {
      email: 'testemail@gmail.com',
      username: 'testusername',
      password: "testpassword",
    }
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)

    cy.visit('http://localhost:3000');
    cy.contains('Sign in').click();

    // logging in the user before running tests
    cy.contains('Sign in to your account');
    cy.get('#username').type('testusername');
    cy.get('#password').type('testpassword');
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    cy.wait(2000);
    cy.contains('Profile');
    cy.contains('Create New Post');
  });

  it('works when valid title and description are given', () => {
    cy.contains('Create New Post').click();
    cy.get('#title').type(testPost.title);
    cy.get('#description').type(testPost.description);
    cy.get('#createPostButton').should('be.enabled');
    cy.get('#createPostButton').click();

    cy.contains('Home').click();
    cy.contains(testPost.title);
    cy.contains(testPost.description);
  });

  it('is not allowed when title is left empty', () => {
    cy.contains('Create New Post').click();
    cy.get('#description').type(testPost.description);
    cy.get('#createPostButton').should('be.disabled');
  });

  it('is not allowed when description is left empty', () => {
    cy.contains('Create New Post').click();
    cy.get('#title').type(testPost.title);
    cy.get('#createPostButton').should('be.disabled');
  });

});
