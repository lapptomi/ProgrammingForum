import { testUser, testPost, testUser2, baseUrl } from '../constants';

describe('Creating a new post', () => {
  beforeEach(() => {
    cy.request('POST', `${baseUrl}/api/testing/resetdb`);

    // creating user for testing
    cy.request('POST', `${baseUrl}/api/users`, testUser)
    cy.visit(`${baseUrl}`);
    cy.clearLocalStorage();
    cy.reload();

    // logging in the user before running tests
    cy.get('#navbarSignInButton').click();
    cy.contains('SIGN IN TO YOUR ACCOUNT');
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    cy.contains('PROFILE');
    cy.contains('CREATE NEW POST');
  });

  it('works when valid title and description are given', () => {
    cy.contains('CREATE NEW POST').click();
    cy.get('#title').type(testPost.title);
    cy.get('#description').type(testPost.description);
    cy.get('#createPostButton').should('be.enabled');
    cy.get('#createPostButton').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Post created!');
    });

    cy.contains(testPost.title);
    cy.contains(testPost.description);
  });

  it('is not allowed when title is left empty', () => {
    cy.contains('CREATE NEW POST').click();
    cy.get('#description').type(testPost.description);
    cy.get('#createPostButton').should('be.disabled');
  });

  it('is not allowed when description is left empty', () => {
    cy.contains('CREATE NEW POST').click();
    cy.get('#title').type(testPost.title);
    cy.get('#createPostButton').should('be.disabled');
  });
});


describe('Liking a post', () => {
  beforeEach(() => {
    cy.request('POST', `${baseUrl}/api/testing/resetdb`);

    // creating user for testing
    cy.request('POST', `${baseUrl}/api/users`, testUser)
    // creating second user for testing
    cy.request('POST', `${baseUrl}/api/users`, testUser2)

    cy.visit(`${baseUrl}`);
    cy.clearLocalStorage();
    cy.reload();

    // logging in the user before running tests
    cy.get('#navbarSignInButton').click();
    cy.contains('SIGN IN TO YOUR ACCOUNT');
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    cy.contains('PROFILE');

    // Creating a post
    cy.contains('CREATE NEW POST').click();
    cy.get('#title').type(testPost.title);
    cy.get('#description').type(testPost.description);
    cy.get('#createPostButton').should('be.enabled');
    cy.get('#createPostButton').click();

    cy.contains(testPost.title);
    cy.contains(testPost.description);
  });

  it('can be done if user logged in', () => {
    cy.get('#postLikes').eq(0);
    cy.get('#postLikeButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Like added!');
    });

    cy.wait(1000)
    cy.get('#postLikes').contains(1);
  });
 
  it('does not work when user has already liked a post', () => {
    cy.get('#postLikes').eq(0);
    cy.get('#postLikeButton').click();

    cy.wait(1000)
    cy.get('#postLikes').contains(1);
    cy.get('#postLikeButton').click();
  
    cy.wait(1000)
    cy.get('#postLikes').contains(1);
  });
 
  it('cannot be done if user is not logged in', () => {
    cy.get('#navbarSignOutButton').click();

    cy.get('#postLikes').contains(0);
    cy.get('#postLikeButton').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You must be logged in to add likes');
    });

    cy.get('#postLikes').eq(0);
  });

  it('can be liked by many different users', () => {
    // Liking post by the first user
    cy.get('#postLikes').contains(0);
    cy.get('#postLikeButton').click();

    cy.wait(1000)
    cy.get('#postLikes').contains(1);

    // Sign out and sign in as another user
    cy.get('#navbarSignOutButton').click();
    cy.get('#navbarSignInButton').click();
    cy.contains('SIGN IN TO YOUR ACCOUNT');
    cy.get('#username').type(testUser2.username);
    cy.get('#password').type(testUser2.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    // Like post again by another user
    cy.contains('PROFILE');
    cy.wait(1000)
    cy.get('#postLikes').contains(1);
    cy.get('#postLikeButton').click();

    cy.wait(1000)
    cy.get('#postLikes').contains(2);

    cy.wait(1000)
    cy.get('#postLikeButton').click();
    cy.get('#postLikes').contains(2);
  });
});

