import { testUser, testUser2, testPost, baseUrl } from '../constants';

const testComment = {
  comment: 'random comment'
};

const testComment2 = {
  comment: 'random comment2'
};

const invalidComment = {
  comment: ''
};

describe('Adding comments to a post', () => {
  beforeEach(() => {
    cy.request('POST', `${baseUrl}/api/testing/resetdb`);

    // Creating user for testing
    cy.request('POST', `${baseUrl}/api/users`, testUser)

    cy.visit(`${baseUrl}`);
    
    // Logging in the user before running tests
    cy.get('#navbarSignInButton').click();
    cy.contains('SIGN IN TO YOUR ACCOUNT');
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    // Creating a new post
    cy.contains('CREATE NEW POST').click();
    cy.get('#title').type(testPost.title);
    cy.get('#description').type(testPost.description);
    cy.get('#createPostButton').should('be.enabled');
    cy.get('#createPostButton').click();   

    // Opening the post created
    cy.contains('Posts');
    cy.contains(testPost.title);
    cy.contains('Comments').click();
  });

  it('works when valid comment is given', () => {
    cy.contains('Add a new comment.');
    cy.get('#commentField').type(testComment.comment);
    cy.get('#addCommentButton').should('be.enabled');
    cy.get('#addCommentButton').click();
    
    cy.contains(testComment.comment);
    cy.contains(testUser.username);
  });

  it('cannot be done if comment is left empty', () => {
    cy.contains('Add a new comment.');
    cy.get('#addCommentButton').should('be.disabled');
    
    const token = JSON.parse(localStorage.getItem('loggedUser')).token;

    // Try also adding an empty comment by POST request (should fail)
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/posts/1/comments`,
      failOnStatusCode: false,
      form: true, 
      body: {
        comment: invalidComment.comment
      },
      headers: {
        Authorization: `bearer ${token}`,
      },
    }).then((res) => expect(res.status).to.eq(404));
  });

  it('can be done multiple times', () => {
    // Add first comment
    cy.contains('Add a new comment.');
    cy.get('#commentField').type(testComment.comment);
    cy.get('#addCommentButton').should('be.enabled');
    cy.get('#addCommentButton').click();
    
    cy.wait(1000)
    // Add another comment
    cy.contains('Add a new comment.');
    cy.get('#commentField').type(testComment2.comment);
    cy.get('#addCommentButton').should('be.enabled');
    cy.get('#addCommentButton').click();
  
    cy.contains(testComment.comment);
    cy.contains(testComment2.comment);
    cy.contains(testUser.username);
  });

});


describe('Liking a comment', () => {
  beforeEach(() => {
    cy.request('POST', `${baseUrl}/api/testing/resetdb`);

    // Creating users for testing
    cy.request('POST', `${baseUrl}/api/users`, testUser)
    cy.request('POST', `${baseUrl}/api/users`, testUser2)

    cy.visit(`${baseUrl}`);
    
    // Logging in the user before running tests
    cy.get('#navbarSignInButton').click();
    cy.contains('SIGN IN TO YOUR ACCOUNT');
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    // Creating a new post
    cy.contains('CREATE NEW POST').click();
    cy.get('#title').type(testPost.title);
    cy.get('#description').type(testPost.description);
    cy.get('#createPostButton').should('be.enabled');
    cy.get('#createPostButton').click();   

    // Opening the post created
    cy.contains('Posts');
    cy.contains(testPost.title);
    cy.contains('Comments').click();

    // Create new comment
    cy.contains('Add a new comment.');
    cy.get('#commentField').type(testComment.comment);
    cy.get('#addCommentButton').should('be.enabled');
    cy.get('#addCommentButton').click();
    
    cy.contains(testComment.comment);
    cy.contains(testUser.username);
  });
  
  it('can be done if user logged in', () => {
    cy.get('#commentLikes').contains(0);
    cy.get('#commentLikeButton').click();
    
    cy.wait(1000)
    cy.get('#commentLikes').contains(1);
  });

  it('does not work when user has already liked the comment', () => {
    cy.get('#commentLikes').contains(0);
    cy.get('#commentLikeButton').click();
    
    cy.wait(1000)
    cy.get('#commentLikes').contains(1);

    cy.get('#commentLikeButton').click();
    
    cy.wait(1000)
    cy.get('#commentLikes').contains(1);
  });

  it('cannot be done if user is not logged in', () => {
    cy.get('#navbarSignOutButton').click();
    cy.contains(testPost.title).click();

    cy.get('#commentLikes').contains(0);
    cy.get('#commentLikeButton').click();
    
    cy.get('#commentLikes').contains(0);
    cy.get('#commentLikeButton').click();

    cy.get('#commentLikes').contains(0);
  });

  it('can be done with many different users', () => {
    // Liking post by the first user
    cy.get('#commentLikes').contains(0);
    cy.get('#commentLikeButton').click();

    cy.wait(1000)
    cy.get('#commentLikes').contains(1);

    // Sign out and sign in as another user
    cy.get('#navbarSignOutButton').click();
    cy.get('#navbarSignInButton').click();
    cy.contains('SIGN IN TO YOUR ACCOUNT');
    cy.get('#username').type(testUser2.username);
    cy.get('#password').type(testUser2.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    // Open the post
    cy.contains(testPost.title).click();

    // Like post again by another user
    cy.contains('PROFILE');
    cy.get('#commentLikes').contains(1);
    cy.get('#commentLikeButton').click();

    cy.wait(1000)
    cy.get('#commentLikes').contains(2);

    cy.get('#commentLikeButton').click();

    cy.wait(1000)
    cy.get('#commentLikes').contains(2);
  });
});
