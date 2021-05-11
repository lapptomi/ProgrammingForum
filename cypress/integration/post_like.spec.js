const testPost = {
  title: 'randomtitle',
  description: 'randomdescription'
};

const testUser = {
  email: 'testemail@gmail.com',
  username: 'testusername',
  password: "testpassword",
};

const testUser2 = {
  email: 'testemail2@gmail.com',
  username: 'testusername2',
  password: "testpassword2",
};

describe('Liking a post', () => {

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/resetdb');

    // creating user for testing
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)
    // creating second user for testing
    cy.request('POST', 'http://localhost:3001/api/users/', testUser2)

    cy.visit('http://localhost:3000');

    // logging in the user before running tests
    cy.wait(1000);
    cy.get('#navbarSignInButton').click();
    cy.contains('Sign in to your account');
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    cy.wait(1000);
    cy.contains('Profile');

    // Creating a post
    cy.contains('Create New Post').click();
    cy.get('#title').type(testPost.title);
    cy.get('#description').type(testPost.description);
    cy.get('#createPostButton').should('be.enabled');
    cy.get('#createPostButton').click();

    cy.wait(1000)
    cy.contains(testPost.title);
    cy.contains(testPost.description);
  });

  it('can be done if user logged in', () => {
    cy.contains('likes 0').click();
    cy.wait(1000)
    cy.contains('likes 1')
  });

  it('does not work when user have already liked a post', () => {
    cy.contains('likes 0').click();
    cy.wait(1000)
    cy.contains('likes 1').click()
    cy.wait(1000)
    cy.contains('likes 1');
  });

  it('cannot be done if user is not logged in', () => {
    cy.get('#navbarSignOutButton').click();

    cy.contains('likes 0').click();
    cy.wait(1000)
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You must be logged in to add likes');
    });

    cy.contains('likes 0').click();
  });

   it('can be liked by many users', () => {
    // Liking post by the first user
    cy.contains('likes 0').click();
    cy.wait(1000)
    cy.contains('likes 1').click()
    cy.wait(1000)

    // Sign out and sign in as a another user
    cy.get('#navbarSignOutButton').click();
    cy.wait(1000);
    cy.get('#navbarSignInButton').click();
    cy.contains('Sign in to your account');
    cy.get('#username').type(testUser2.username);
    cy.get('#password').type(testUser2.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    // Like post again by another user
    cy.wait(1000);
    cy.contains('Profile');
    cy.contains('likes 1').click();
    cy.contains('likes 2').click();
    cy.contains('likes 2');
  });

});