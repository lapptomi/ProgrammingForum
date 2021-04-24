describe('When user is logged out', () => {
  beforeEach(() => {
    cy.request('GET', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', () => {
    cy.contains('Sign in');
    cy.contains('Sign in');
    cy.contains('Home');
  });
});
