const testPost = {
  title: 'randomtitle',
  description: 'randomdescription'
};

const testUser = {
  email: 'testemail@gmail.com',
  username: 'testusername',
  password: "testpassword",
};

const testComment = {
  comment: 'random comment'
};
const testComment2 = {
  comment: 'random comment2'
};
const invalidComment = {
  comment: ''
};

describe.only('Adding comments to a post', () => {

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/resetdb');

    // Creating user for testing
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)

    cy.visit('http://localhost:3000');
    cy.contains('Sign in').click();

    // Logging in the user before running tests
    cy.contains('Sign in to your account');
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#loginButton').should('be.enabled');
    cy.get('#loginButton').click();
    
    // Creating a new post
    cy.wait(2000);
    cy.contains('Create New Post').click();
    cy.get('#title').type(testPost.title);
    cy.get('#description').type(testPost.description);
    cy.get('#createPostButton').should('be.enabled');
    cy.get('#createPostButton').click();   

    // Opening the post created
    cy.wait(1000);
    cy.contains('Posts');
    cy.contains(testPost.title);
    cy.contains('Show Comments').click();
  });

  it('works when valid comment is given', () => {
    cy.contains('Add a new comment.');
    cy.get('#commentField').type(testComment.comment);
    cy.get('#addCommentButton').should('be.enabled');
    cy.get('#addCommentButton').click();
    
    cy.wait(2000);
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Comment added!');
    });

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
      url: 'http://localhost:3001/api/posts/1/comments',
      failOnStatusCode: false,
      form: true, 
      body: {
        comment: invalidComment.comment
      },
      headers: {
        Authorization: `bearer ${token}`,
      },
    }).then((res) => expect(res.status).to.eq(401));
  });

  it('can be done multiple times', () => {
    // Add first comment
    cy.contains('Add a new comment.');
    cy.get('#commentField').type(testComment.comment);
    cy.get('#addCommentButton').should('be.enabled');
    cy.get('#addCommentButton').click();

    cy.wait(2000);
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Comment added!');
    });

    // Add another comment
    cy.contains('Add a new comment.');
    cy.get('#commentField').type(testComment2.comment);
    cy.get('#addCommentButton').should('be.enabled');
    cy.get('#addCommentButton').click();

    cy.wait(2000);
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Comment added!');
    });

    cy.contains(testComment.comment);
    cy.contains(testComment2.comment);
    cy.contains(testUser.username);
  });

});
