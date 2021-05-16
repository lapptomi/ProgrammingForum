describe('When user is logged out', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/resetdb');
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', () => {
    cy.contains('Home');
  });
});
