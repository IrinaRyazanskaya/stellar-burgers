describe('Modal with ingredient details', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');

    cy.wait('@getIngredients');

    cy.get('[data-cy="burger-ingredients"]').should('be.visible');
  });

  it('should be opened when clicking on an ingredient', () => {
    cy.contains('Флюоресцентная булка R2-D3').click();

    cy.location('pathname').should(
      'equal',
      '/ingredients/643d69a5c3f7b9001cfa093d'
    );

    cy.get('[data-cy="modal"]').should('be.visible');

    cy.get('[data-cy="modal"]').within(() => {
      cy.contains('Флюоресцентная булка R2-D3').should('be.visible');

      cy.contains('Белки').should('be.visible');
      cy.contains('44').should('be.visible');

      cy.contains('Жиры').should('be.visible');
      cy.contains('26').should('be.visible');

      cy.contains('Углеводы').should('be.visible');
      cy.contains('85').should('be.visible');

      cy.contains('Калории').should('be.visible');
      cy.contains('643').should('be.visible');
    });
  });

  it('should be closed when clicking close button', () => {
    cy.contains('Флюоресцентная булка R2-D3').click();

    cy.get('[data-cy="modal"]').should('be.visible');

    cy.get('[data-cy="modal-close"]').click();

    cy.get('[data-cy="modal"]').should('not.exist');

    cy.location('pathname').should('equal', '/');
  });

  it('should be closed when clicking outside the modal window', () => {
    cy.contains('Флюоресцентная булка R2-D3').click();

    cy.get('[data-cy="modal"]').should('be.visible');

    cy.get('[data-cy="modal-overlay"]').click('topLeft', { force: true });

    cy.get('[data-cy="modal"]').should('not.exist');

    cy.location('pathname').should('equal', '/');
  });
});
